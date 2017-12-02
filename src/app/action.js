// @flow

/** アクション */
export type Action = | ResizeAction;

/** リサイズ */
export type ResizeAction = {
  type: 'resize'
};