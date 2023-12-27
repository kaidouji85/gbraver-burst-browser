import { Howl } from "howler";
import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";

/** アカウント削除同意ダイアログ プロパティ */
export type DeleteAccountConsentDialogProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** 背景 */
  backGround: HTMLElement;
  /** クローザー */
  closer: HTMLImageElement;
  /** 削除ボタン */
  deleteAccountButton: HTMLButtonElement;
  /** 閉じるボタン */
  closeButton: HTMLButtonElement;
  /** アカウント削除通知 */
  deleteAccount: Subject<void>;
  /** ダイアログ閉じる通知 */
  closeDialog: Subject<void>;
  /** 効果音 値変更 */
  changeValue: Howl;
  /** 効果音 ボタン押下 */
  pushButton: Howl;
  /** 排他制御 */
  exclusive: Exclusive;
};
