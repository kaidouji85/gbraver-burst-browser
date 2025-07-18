import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";
import { SoundResource } from "../../resource/sound/resource";
import { SEPlayerContainer } from "../../se/se-player";

/** チュートリアル説明ダイアログのプロパティ */
export type TutorialDescriptionDialogProps = Readonly<SEPlayerContainer> & {
  /** ルート要素 */
  readonly root: HTMLElement;
  /** クロージャー */
  readonly closer: HTMLImageElement;
  /** 「チュートリアルをはじめる」ボタン */
  readonly startTutorialButton: HTMLButtonElement;
  /** 「閉じる」ボタン */
  readonly closeButton: HTMLButtonElement;
  /** バックグラウンド */
  readonly backGround: HTMLDivElement;

  /** 決定音 */
  readonly pushButtonSound: SoundResource;
  /** 閉じる音 */
  readonly changeValueSound: SoundResource;

  /** 排他制御 */
  readonly exclusive: Exclusive;

  /** 閉じる通知 */
  readonly closeNotifier: Subject<void>;
  /** 「チュートリアルをはじめる」通知 */
  readonly startTutorialNotifier: Subject<void>;
};
