import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";

/** ステータスダイアログのプロパティ */
export type StatusDialogProps = {
  /** ルート要素 */
  readonly root: HTMLElement;
  /** バックグラウンド要素 */
  readonly backGround: HTMLElement;
  /** クローザー要素 */
  readonly closer: HTMLImageElement;

  /** 排他制御 */
  readonly exclusive: Exclusive;

  /** 閉じる通知 */
  readonly closeNotifier: Subject<void>;
};
