import { ResourceLoading } from "../resource/loading/load-resources";

/** Sharedリソースの状態 */
export type SharedResourceState = Idle | Loading | Complete;

/** アイドル */
export type Idle = {
  type: "Idle";
};

/** ロード中 */
export type Loading = {
  type: "Loading";
  /** Sharedリソースの読み込みオブジェクト */
  resourceLoading: ResourceLoading;
};

/** ロード完了 */
export type Complete = {
  type: "Complete";
};
