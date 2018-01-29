// @flow

/** アクション */
export type Action =
  | ResizeAction
  | GameLoopAction
  | DebugModeAction
  | MouseDown;

/** リサイズ */
export type ResizeAction = {
  type: 'resize'
};

/** ゲームループ */
export type GameLoopAction = {
  type: 'gameLoop',
  time: DOMHighResTimeStamp,
};

/** デバッグモード */
export type DebugModeAction = {
  type: 'debugMode'
};

/** マウスダウン */
export type MouseDown = {
  type: 'mouseDown',
  event: Event
};