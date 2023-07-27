import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";

/** メール認証未完了画面のプロパティ */
export type MailVerifiedIncompleteProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** タイトルへ */
  gotoTitleButton: HTMLElement;
  /** 画面再読み込み */
  reloadButton: HTMLElement;
  /** 「タイトルへ」通知ストリーム*/
  gotoTitle: Subject<void>;
  /** 画面再読み込み通知ストリーム */
  reload: Subject<void>;
  /** 排他制御 */
  exclusive: Exclusive;
};
