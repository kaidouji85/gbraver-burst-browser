import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";
import { SoundResource } from "../../resource/sound/resource";

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
  changeValue: SoundResource;
  /** 効果音 ボタン押下 */
  pushButton: SoundResource;
  /** 排他制御 */
  exclusive: Exclusive;
};
