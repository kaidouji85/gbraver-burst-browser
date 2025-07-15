import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";
import { SoundResource } from "../../resource/sound/resource";
import { SEPlayerContainer } from "../../se/se-player";

/** チュートリアル説明ダイアログのプロパティ */
export type TutorialDescriptionDialogProps = SEPlayerContainer & {
  /** ルート要素 */
  root: HTMLElement;
  /** クロージャー */
  closer: HTMLImageElement;
  /** 「チュートリアルをはじめる」ボタン */
  startTutorial: HTMLButtonElement;
  /** 「閉じる」ボタン */
  close: HTMLButtonElement;

  /** 決定音 */
  pushButtonSound: SoundResource;
  /** 閉じる音 */
  changeValueSound: SoundResource;

  /** 排他制御 */
  exclusive: Exclusive;

  /** 閉じる通知 */
  closeNotifier: Subject<void>;
};
