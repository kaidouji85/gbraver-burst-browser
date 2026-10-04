import { AbortManager } from "./abort-manager";

/** Abort管理オブジェクトコンテナ */
export type AbortManagerContainer = {
  /** Abort管理オブジェクト */
  abort: AbortManager;
};
