// @flow

/** アクション */
export type Action =
  | ResizeAction
  | GameLoopAction
  | DebugModeAction;

/** リサイズ */
export type ResizeAction = {
  type: 'resize'
};

/** ゲームループ */
export type GameLoopAction = {
  type: 'gameLoop'
};

/** デバッグモード */
export type DebugModeAction = {
  type: 'debugMode'
};