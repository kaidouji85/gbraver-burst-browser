import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";
import { SoundResource } from "../../resource/sound/resource";
import { SEPlayerContainer } from "../../se/se-player";

/** ローカル対戦ホストダイアログのプロパティ */
export type LocalBattleHostDialogProps = SEPlayerContainer & {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** クロージャー */
  closer: HTMLElement;

  /** 閉じるボタンのサウンド */
  closeButtonSound: SoundResource;

  /** ダイアログが閉じられたときの通知 */
  dialogClosed: Subject<void>;

  /** 排他制御 */
  exclusive: Exclusive;
};
