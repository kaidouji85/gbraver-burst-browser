// @flow

/**
 * タイトル -> ゲーム に通知されるアクションをまとめたもの
 */

/** ゲームスタートボタンが押された */
export type PushGameStart = {
  type: 'PushGameStart'
};

/** 遊び方ボタンが押された */
export type PushHowToPlay = {
  type: 'PushHowToPlay'
};