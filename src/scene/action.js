// @flow

/** アクション */
export type Action =
  | ResizeAction
  | GameLoopAction
  | DebugModeAction
  | MouseDown
  | MouseMove
  | MouseUp
  | MouseLeave
  | TouchStart
  | TouchEnd
  | PushAttackButton;

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


/** マウスムーブ */
export type MouseMove = {
  type: 'mouseMove',
  event: MouseEvent
};

/** マウスアップ */
export type MouseUp = {
  type: 'mouseUp',
  event: MouseEvent
};

/** マウスリーブ */
export type MouseLeave = {
  type: 'mouseLeave',
  event: MouseEvent
};

/** タッチスタートイベント */
export type TouchStart = {
  type: 'touchStart',
  event: TouchEvent
};

/** タッチエンドイベント */
export type TouchEnd = {
  type: 'touchEnd',
  event: TouchEvent
};

/** コウゲキボタンを押した */
export type PushAttackButton = {
  type: 'pushAttackButton'
};