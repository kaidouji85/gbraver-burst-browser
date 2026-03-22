import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";
import { SoundResource } from "../../resource/sound/resource";
import { SEPlayerContainer } from "../../se/se-player";

/** バトルスタート通知のペイロード */
export type BattleStartPayload = {
  /** 入力したパスワード */
  password: string;
};

/** ローカル対戦ゲストダイアログのプロパティ */
export type LocalBattleGuestDialogProps = SEPlayerContainer & {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** クロージャー */
  closer: HTMLElement;
  /** あいことば入力欄 */
  password: HTMLInputElement;
  /** バトルスタートボタン */
  battleStartButton: HTMLElement;

  /** バトルスタートボタンを押したときのサウンド */
  battleStartSound: SoundResource;
  /** ダイアログを閉じたときのサウンド */
  dialogClosedSound: SoundResource;

  /** バトルスタート通知 */
  battleStartSubject: Subject<BattleStartPayload>;
  /** ダイアログが閉じられたときの通知 */
  dialogClosedSubject: Subject<void>;

  /** 排他制御 */
  exclusive: Exclusive;
};
