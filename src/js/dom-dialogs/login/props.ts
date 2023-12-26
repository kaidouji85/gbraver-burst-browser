import { Howl } from "howler";
import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";

/** ログインダイアログのプロパティ */
export type LoginDialogProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** クローザー */
  closer: HTMLImageElement;
  /** ログインボタン */
  loginButton: HTMLButtonElement;
  /** 閉じるボタン */
  closeButton: HTMLButtonElement;
  /** ダイアログ閉じる通知 */
  closeDialog: Subject<void>;
  /** ログイン通知 */
  login: Subject<void>;
  /** 効果音 値変更 */
  changeValue: Howl;
  /** 効果音 ボタン押下 */
  pushButton: Howl;
  /** 排他制御 */
  exclusive: Exclusive;
};
