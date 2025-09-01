import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";
import { SoundResource } from "../../resource/sound/resource";
import { SEPlayerContainer } from "../../se/se-player";

/** ステータスダイアログのプロパティ */
export type StatusDialogProps = SEPlayerContainer & {
  /** ルート要素 */
  readonly root: HTMLElement;
  /** バックグラウンド要素 */
  readonly backGround: HTMLElement;
  /** クローザー要素 */
  readonly closer: HTMLImageElement;

  /** 排他制御 */
  readonly exclusive: Exclusive;

  /** 値変更音 */
  readonly changeValueSound: SoundResource;

  /** 閉じる通知 */
  readonly closeNotifier: Subject<void>;
};
