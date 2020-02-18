// @flow

/** 最後に押されたボタン */
type Button = 'GameStart' | 'HowToPlay';

/** タイトルシーン終了 */
export type EndTitle = {
  type: 'EndTitle',
  button: Button,
};