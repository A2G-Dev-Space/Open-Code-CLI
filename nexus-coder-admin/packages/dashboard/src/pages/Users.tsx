import { useState, useEffect } from 'react';
import { User, Search, ChevronLeft, ChevronRight, Shield, ShieldOff, ShieldCheck, Crown } from 'lucide-react';
import { usersApi } from '../services/api';

/**
 * URL 인코딩된 사용자 이름을 디코딩
 */
function decodeUsername(name: string | undefined | null): string {
  if (!name) return '';
  try {
    return decodeURIComponent(name);
  } catch {
    return name;
  }
}

interface UserData {
  id: string;
  loginid: string;
  username: string;
  deptname: string;
  firstSeen: string;
  lastActive: string;
  isActive: boolean;
  _count: {
    usageLogs: number;
  };
}

interface AdminStatus {
  isAdmin: boolean;
  adminRole: 'SUPER_ADMIN' | 'ADMIN' | 'VIEWER' | null;
  isDeveloper: boolean;
  canModify: boolean;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function Users() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [adminStatuses, setAdminStatuses] = useState<Record<string, AdminStatus>>({});
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [promoting, setPromoting] = useState<string | null>(null);

  useEffect(() => {
    loadUsers(1);
  }, []);

  const loadUsers = async (page: number) => {
    setLoading(true);
    try {
      const response = await usersApi.list(page, 50);
      setUsers(response.data.users);
      setPagination(response.data.pagination);

      // Load admin status for each user
      const statuses: Record<string, AdminStatus> = {};
      await Promise.all(
        response.data.users.map(async (user: UserData) => {
          try {
            const statusResponse = await usersApi.getAdminStatus(user.id);
            statuses[user.id] = statusResponse.data;
          } catch {
            statuses[user.id] = { isAdmin: false, adminRole: null, isDeveloper: false, canModify: true };
          }
        })
      );
      setAdminStatuses(statuses);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePromote = async (userId: string, role: 'ADMIN' | 'VIEWER') => {
    setPromoting(userId);
    try {
      await usersApi.promote(userId, role);
      // Reload admin status
      const statusResponse = await usersApi.getAdminStatus(userId);
      setAdminStatuses((prev) => ({ ...prev, [userId]: statusResponse.data }));
    } catch (error) {
      console.error('Failed to promote user:', error);
      alert('승격에 실패했습니다.');
    } finally {
      setPromoting(null);
    }
  };

  const handleDemote = async (userId: string) => {
    if (!confirm('정말 관리자 권한을 해제하시겠습니까?')) return;
    setPromoting(userId);
    try {
      await usersApi.demote(userId);
      // Reload admin status
      const statusResponse = await usersApi.getAdminStatus(userId);
      setAdminStatuses((prev) => ({ ...prev, [userId]: statusResponse.data }));
    } catch (error) {
      console.error('Failed to demote user:', error);
      alert('권한 해제에 실패했습니다.');
    } finally {
      setPromoting(null);
    }
  };

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.loginid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.deptname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleBadge = (status: AdminStatus | undefined) => {
    if (!status?.isAdmin) return null;

    if (status.isDeveloper) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
          <Crown className="w-3 h-3" />
          개발자
        </span>
      );
    }

    if (status.adminRole === 'SUPER_ADMIN') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded-full">
          <ShieldCheck className="w-3 h-3" />
          슈퍼관리자
        </span>
      );
    }

    if (status.adminRole === 'ADMIN') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
          <Shield className="w-3 h-3" />
          관리자
        </span>
      );
    }

    if (status.adminRole === 'VIEWER') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
          <Shield className="w-3 h-3" />
          뷰어
        </span>
      );
    }

    return null;
  };

  if (loading && users.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-samsung-blue"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">사용자 관리</h1>
        <p className="text-gray-500 mt-1">등록된 사용자 목록 및 권한 관리</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="이름, ID, 부서로 검색..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-samsung-blue focus:border-transparent"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  사용자
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  부서
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  권한
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  마지막 활동
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  요청 수
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => {
                const status = adminStatuses[user.id];
                const isProcessing = promoting === user.id;

                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-samsung-blue/10 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-samsung-blue" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{decodeUsername(user.username)}</p>
                          <p className="text-sm text-gray-500">{user.loginid}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{decodeUsername(user.deptname)}</p>
                    </td>
                    <td className="px-6 py-4">
                      {getRoleBadge(status) || (
                        <span className="text-sm text-gray-400">일반 사용자</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{formatDate(user.lastActive)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{user._count.usageLogs.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {isProcessing ? (
                          <div className="w-5 h-5 border-2 border-samsung-blue border-t-transparent rounded-full animate-spin" />
                        ) : status?.canModify === false ? (
                          <span className="text-xs text-gray-400">수정 불가</span>
                        ) : status?.isAdmin ? (
                          <button
                            onClick={() => handleDemote(user.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <ShieldOff className="w-3.5 h-3.5" />
                            권한 해제
                          </button>
                        ) : (
                          <div className="flex gap-1">
                            <button
                              onClick={() => handlePromote(user.id, 'ADMIN')}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                            >
                              <Shield className="w-3.5 h-3.5" />
                              관리자
                            </button>
                            <button
                              onClick={() => handlePromote(user.id, 'VIEWER')}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              뷰어
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    {searchQuery ? '검색 결과가 없습니다.' : '사용자가 없습니다.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {(pagination.page - 1) * pagination.limit + 1} -{' '}
              {Math.min(pagination.page * pagination.limit, pagination.total)} / 총 {pagination.total}명
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => loadUsers(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-600">
                {pagination.page} / {pagination.totalPages}
              </span>
              <button
                onClick={() => loadUsers(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
