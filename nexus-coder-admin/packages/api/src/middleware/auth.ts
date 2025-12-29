/**
 * Authentication Middleware
 *
 * Verifies JWT tokens and checks admin permissions
 * - DEVELOPERS 환경변수: 쉼표로 구분된 개발자 loginid 목록 (SUPER_ADMIN 권한)
 * - DB admins 테이블: 동적으로 관리되는 관리자 목록
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../index.js';

export interface JWTPayload {
  loginid: string;
  deptname: string;
  username: string;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedRequest extends Request {
  user?: JWTPayload;
  userId?: string;        // DB User ID
  isAdmin?: boolean;
  adminRole?: 'SUPER_ADMIN' | 'ADMIN' | 'VIEWER';
  isDeveloper?: boolean;  // 환경변수 개발자 여부
}

const JWT_SECRET = process.env['JWT_SECRET'] || 'your-jwt-secret-change-in-production';

/**
 * 환경변수에서 개발자 목록 가져오기
 */
function getDevelopers(): string[] {
  const developers = process.env['DEVELOPERS'] || '';
  return developers.split(',').map(d => d.trim()).filter(Boolean);
}

/**
 * 개발자인지 확인 (환경변수 기반)
 */
export function isDeveloper(loginid: string): boolean {
  const developers = getDevelopers();
  return developers.includes(loginid);
}

/**
 * Verify JWT token and attach user to request
 */
export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access token required' });
    return;
  }

  try {
    // First try to verify as internally signed token (from admin-login or session)
    const internalPayload = verifyInternalToken(token);
    if (internalPayload && internalPayload.loginid) {
      req.user = internalPayload;
      next();
      return;
    }

    // Check for SSO token format (sso.base64EncodedData)
    if (token.startsWith('sso.')) {
      const ssoData = decodeSSOToken(token.substring(4));
      if (ssoData && ssoData.loginid) {
        req.user = ssoData;
        next();
        return;
      }
    }

    // If not internal token, try decoding as SSO token (base64 decode)
    const decoded = decodeJWT(token);

    if (!decoded || !decoded.loginid) {
      res.status(403).json({ error: 'Invalid token' });
      return;
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(403).json({ error: 'Invalid token' });
  }
}

/**
 * Check if user is an admin
 * 1. 환경변수 DEVELOPERS에 있으면 → SUPER_ADMIN
 * 2. DB admins 테이블에 있으면 → 해당 역할
 */
export async function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  if (!req.user) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  try {
    // 1. 환경변수 개발자 체크 (SUPER_ADMIN)
    if (isDeveloper(req.user.loginid)) {
      req.isAdmin = true;
      req.isDeveloper = true;
      req.adminRole = 'SUPER_ADMIN';
      next();
      return;
    }

    // 2. DB admin 체크
    const admin = await prisma.admin.findUnique({
      where: { loginid: req.user.loginid },
    });

    if (!admin) {
      res.status(403).json({ error: 'Admin access required' });
      return;
    }

    req.isAdmin = true;
    req.isDeveloper = false;
    req.adminRole = admin.role;
    next();
  } catch (error) {
    console.error('Admin check error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Check if user is a super admin
 * 환경변수 개발자 또는 DB SUPER_ADMIN만 허용
 */
export async function requireSuperAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  if (!req.user) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  try {
    // 1. 환경변수 개발자 체크 (항상 SUPER_ADMIN)
    if (isDeveloper(req.user.loginid)) {
      req.isAdmin = true;
      req.isDeveloper = true;
      req.adminRole = 'SUPER_ADMIN';
      next();
      return;
    }

    // 2. DB admin 체크 (SUPER_ADMIN만)
    const admin = await prisma.admin.findUnique({
      where: { loginid: req.user.loginid },
    });

    if (!admin || admin.role !== 'SUPER_ADMIN') {
      res.status(403).json({ error: 'Super admin access required' });
      return;
    }

    req.isAdmin = true;
    req.isDeveloper = false;
    req.adminRole = admin.role;
    next();
  } catch (error) {
    console.error('Super admin check error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Decode SSO token (Unicode-safe base64 decode)
 * Frontend encodes: btoa(unescape(encodeURIComponent(json)))
 * Backend decodes: decodeURIComponent(escape(base64Decode))
 */
function decodeSSOToken(base64Token: string): JWTPayload | null {
  try {
    // Decode base64 to binary string
    const binaryString = Buffer.from(base64Token, 'base64').toString('binary');
    // Convert binary string to UTF-8 (reverse of unescape(encodeURIComponent()))
    const jsonString = decodeURIComponent(
      binaryString.split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
    );
    const payload = JSON.parse(jsonString);

    console.log('SSO token payload:', JSON.stringify(payload, null, 2));

    return {
      loginid: payload.loginid || '',
      deptname: payload.deptname || '',
      username: payload.username || '',
    };
  } catch (error) {
    console.error('SSO token decode error:', error);
    return null;
  }
}

/**
 * Decode JWT token (base64url decode)
 */
function decodeJWT(token: string): JWTPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payloadBase64 = parts[1]!
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString('utf8'));

    // Debug: log actual payload fields
    console.log('JWT payload fields:', Object.keys(payload));
    console.log('JWT payload:', JSON.stringify(payload, null, 2));

    return {
      loginid: payload.loginid || payload.sub || payload.user_id || payload.userId || payload.id || '',
      deptname: payload.deptname || payload.department || payload.dept || payload.deptName || '',
      username: payload.username || payload.name || payload.display_name || payload.userName || payload.displayName || '',
      iat: payload.iat,
      exp: payload.exp,
    };
  } catch (error) {
    console.error('JWT decode error:', error);
    return null;
  }
}

/**
 * Sign a JWT token (for internal session management)
 */
export function signToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

/**
 * Verify internally signed token
 */
export function verifyInternalToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}
