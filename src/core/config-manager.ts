/**
 * Configuration Manager
 *
 * OPEN-CLI 설정 관리 시스템
 * ~/.open-cli/ 디렉토리 및 설정 파일 관리
 */

import { OpenConfig, EndpointConfig, ModelInfo } from '../types';
import {
  OPEN_HOME_DIR,
  CONFIG_FILE_PATH,
  SESSIONS_DIR,
  DOCS_DIR,
  BACKUPS_DIR,
  LOGS_DIR,
  DEFAULT_ENDPOINT_ID,
  DEFAULT_MODEL_ID,
} from '../constants';
import {
  ensureDirectory,
  readJsonFile,
  writeJsonFile,
  directoryExists,
} from '../utils/file-system';

/**
 * 기본 Gemini 엔드포인트 설정
 */
const DEFAULT_GEMINI_ENDPOINT: EndpointConfig = {
  id: DEFAULT_ENDPOINT_ID,
  name: 'Gemini 2.0 Flash (Default)',
  baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai/',
  apiKey: 'AIzaSyAZWTQSWpv7SwK2WeIE28Oy3tjHDE4b5GI',
  models: [
    {
      id: 'gemini-2.0-flash',
      name: 'Gemini 2.0 Flash',
      maxTokens: 1048576, // 1M tokens
      enabled: true,
      healthStatus: 'healthy',
    },
  ],
  priority: 1,
  description: 'Google Gemini 2.0 Flash model via OpenAI-compatible API',
  createdAt: new Date(),
  updatedAt: new Date(),
};

/**
 * 기본 설정
 */
const DEFAULT_CONFIG: OpenConfig = {
  version: '0.1.0',
  currentEndpoint: DEFAULT_ENDPOINT_ID,
  currentModel: DEFAULT_MODEL_ID,
  endpoints: [DEFAULT_GEMINI_ENDPOINT],
  settings: {
    autoApprove: false,
    debugMode: false,
    streamResponse: true,
    autoSave: true,
  },
};

/**
 * ConfigManager 클래스
 *
 * 설정 파일 및 디렉토리 관리
 */
export class ConfigManager {
  private config: OpenConfig | null = null;
  private initialized = false;

  /**
   * OPEN-CLI 초기화
   * ~/.open-cli/ 디렉토리 및 설정 파일 생성
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    // 홈 디렉토리 생성
    await ensureDirectory(OPEN_HOME_DIR);

    // 하위 디렉토리 생성
    await ensureDirectory(SESSIONS_DIR);
    await ensureDirectory(DOCS_DIR);
    await ensureDirectory(BACKUPS_DIR);
    await ensureDirectory(LOGS_DIR);

    // 설정 파일 로드 또는 생성
    await this.loadOrCreateConfig();

    this.initialized = true;
  }

  /**
   * 설정 파일 로드 또는 기본 설정 생성
   */
  private async loadOrCreateConfig(): Promise<void> {
    const existingConfig = await readJsonFile<OpenConfig>(CONFIG_FILE_PATH);

    if (existingConfig) {
      this.config = existingConfig;
    } else {
      // 기본 설정 생성
      this.config = { ...DEFAULT_CONFIG };
      await this.saveConfig();
    }
  }

  /**
   * 설정 저장
   */
  async saveConfig(): Promise<void> {
    if (!this.config) {
      throw new Error('Configuration not initialized');
    }

    await writeJsonFile(CONFIG_FILE_PATH, this.config);
  }

  /**
   * 현재 설정 가져오기
   */
  getConfig(): OpenConfig {
    if (!this.config) {
      throw new Error('Configuration not initialized. Call initialize() first.');
    }

    return this.config;
  }

  /**
   * 현재 엔드포인트 가져오기
   */
  getCurrentEndpoint(): EndpointConfig | null {
    const config = this.getConfig();

    if (!config.currentEndpoint) {
      return null;
    }

    return config.endpoints.find((ep) => ep.id === config.currentEndpoint) || null;
  }

  /**
   * 현재 모델 정보 가져오기
   */
  getCurrentModel(): ModelInfo | null {
    const endpoint = this.getCurrentEndpoint();

    if (!endpoint || !this.config?.currentModel) {
      return null;
    }

    return endpoint.models.find((m) => m.id === this.config?.currentModel) || null;
  }

  /**
   * 모든 엔드포인트 가져오기
   */
  getAllEndpoints(): EndpointConfig[] {
    return this.getConfig().endpoints;
  }

  /**
   * 엔드포인트 추가
   */
  async addEndpoint(endpoint: EndpointConfig): Promise<void> {
    const config = this.getConfig();

    // ID 중복 체크
    const exists = config.endpoints.some((ep) => ep.id === endpoint.id);
    if (exists) {
      throw new Error(`Endpoint with ID ${endpoint.id} already exists`);
    }

    config.endpoints.push(endpoint);
    await this.saveConfig();
  }

  /**
   * 엔드포인트 삭제
   */
  async removeEndpoint(endpointId: string): Promise<void> {
    const config = this.getConfig();

    // 기본 엔드포인트는 삭제 불가
    if (endpointId === DEFAULT_ENDPOINT_ID) {
      throw new Error('Cannot remove default endpoint');
    }

    config.endpoints = config.endpoints.filter((ep) => ep.id !== endpointId);

    // 현재 엔드포인트가 삭제된 경우 기본값으로 변경
    if (config.currentEndpoint === endpointId) {
      config.currentEndpoint = DEFAULT_ENDPOINT_ID;
    }

    await this.saveConfig();
  }

  /**
   * 현재 엔드포인트 변경
   */
  async setCurrentEndpoint(endpointId: string): Promise<void> {
    const config = this.getConfig();

    const endpoint = config.endpoints.find((ep) => ep.id === endpointId);
    if (!endpoint) {
      throw new Error(`Endpoint ${endpointId} not found`);
    }

    config.currentEndpoint = endpointId;

    // 해당 엔드포인트의 첫 번째 활성 모델로 변경
    const activeModel = endpoint.models.find((m) => m.enabled);
    if (activeModel) {
      config.currentModel = activeModel.id;
    }

    await this.saveConfig();
  }

  /**
   * 현재 모델 변경
   */
  async setCurrentModel(modelId: string): Promise<void> {
    const config = this.getConfig();
    const endpoint = this.getCurrentEndpoint();

    if (!endpoint) {
      throw new Error('No endpoint selected');
    }

    const model = endpoint.models.find((m) => m.id === modelId);
    if (!model) {
      throw new Error(`Model ${modelId} not found in current endpoint`);
    }

    if (!model.enabled) {
      throw new Error(`Model ${modelId} is disabled`);
    }

    config.currentModel = modelId;
    await this.saveConfig();
  }

  /**
   * 설정 값 업데이트
   */
  async updateSettings(settings: Partial<OpenConfig['settings']>): Promise<void> {
    const config = this.getConfig();
    config.settings = { ...config.settings, ...settings };
    await this.saveConfig();
  }

  /**
   * 홈 디렉토리 존재 여부 확인
   */
  async isInitialized(): Promise<boolean> {
    return await directoryExists(OPEN_HOME_DIR);
  }

  /**
   * 설정 초기화 (공장 초기화)
   */
  async reset(): Promise<void> {
    this.config = { ...DEFAULT_CONFIG };
    await this.saveConfig();
  }
}

/**
 * ConfigManager 싱글톤 인스턴스
 */
export const configManager = new ConfigManager();
