// @flow

/** アクション */
export type Action =
  | ResizeAction
  | GameLoopAction
  | DebugModeAction
  | MouseDown
  | MouseUp;

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
  event: MouseEvent
};

/** マウスオーバー */
export type MouseUp = {
  type: 'mouseUp',
  event: MouseEvent
};