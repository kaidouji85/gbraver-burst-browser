// @flow

/** アクション */

export type Action =
  | PushAttackButton;

/** コウゲキボタンを押した */
export type PushAttackButton = {
  type: 'pushAttackButton'
};