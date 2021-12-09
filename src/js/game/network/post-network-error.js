// @flow

/** 通信エラーの後処理 */
export type PostNetworkError = Close | GotoTitle;

/** ダイアログを閉じる */
export type Close = {
  type: 'Close'
};

/** タイトルに戻る */
export type GotoTitle = {
  type: 'GotoTitle'
};