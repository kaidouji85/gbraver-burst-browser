// @flow

/** アクション */
export type Action =
  | ResizeAction
  | GameLoopAction;

/** リサイズ */
export type ResizeAction = {
  type: 'resize'
};

/** ゲームループ */
export type GameLoopAction = {
  type: 'gameLoop'
};