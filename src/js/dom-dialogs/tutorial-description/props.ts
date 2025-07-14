import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";

/** チュートリアル説明ダイアログのプロパティ */
export type TutorialDescriptionDialogProps = {
  /** ルート要素 */
  root: HTMLElement;
  /** クロージャー */
  closer: HTMLImageElement;
  /** 「チュートリアルをはじめる」ボタン */
  startTutorial: HTMLButtonElement;
  /** 「閉じる」ボタン */
  close: HTMLButtonElement;

  /** 排他制御 */
  exclusive: Exclusive;

  /** 閉じる通知 */
  closeNotifier: Subject<void>;
};
