import {AbortManager} from "./abort-manager";

/** Abort管理オブジェクトコンテナ */
export type AbortManageContainer = {
  /** Abort管理オブジェクト */
  abort: AbortManager;
}