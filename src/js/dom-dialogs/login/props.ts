import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";
import { SoundResource } from "../../resource/sound/resource";
import { SEPlayerContainer } from "../../se/se-player";

/** ログインダイアログのプロパティ */
export type LoginDialogProps = SEPlayerContainer & {
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
  changeValue: SoundResource;
  /** 効果音 ボタン押下 */
  pushButton: SoundResource;
  /** 排他制御 */
  exclusive: Exclusive;
};
