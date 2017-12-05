// @flow

/** アクション */
export type Action =
  | ResizeAction
  | GameLoopAction
  | DebugMode;

/** リサイズ */
export type ResizeAction = {
  type: 'resize'
};

/** ゲームループ */
export type GameLoopAction = {
  type: 'gameLoop'
};

/** デバッグモード */
export type DebugMode = {
  type: 'debugMode'
};