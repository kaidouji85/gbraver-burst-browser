// @flow

/** タイトル画面で利用するユーザ種別 */
export type TitleUser = GuestUser | LoggedInUser;

/** ゲストユーザ */
export type GuestUser = {
  type: 'GuestUser'
};

/** ログインユーザ */
export type LoggedInUser = {
  type: 'LoggedInUser',
  /** ユーザ名 */
  name: string
}