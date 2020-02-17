// @flow

/** 最後に押されたボタン */
type Button = 'GameStart';

/** タイトルシーン終了 */
export type EndTitle = {
  type: 'EndTitle',
  button: Button,
};