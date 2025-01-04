/** タイトル画面で利用するアカウント種別 */
export type TitleAccount = GuestAccount | LoggedInAccount;

/** ゲスト */
export type GuestAccount = {
  type: "GuestAccount";
};

/** ログインアカウント */
export type LoggedInAccount = {
  type: "LoggedInAccount";
  /** アカウント名 */
  name: string;
  /** 画像URL */
  pictureURL: string;
};
