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
  /** バトルスタートボタン */
  battleStartButton: HTMLElement;

  /** バトルスタートボタンを押したときのサウンド */
  battleStartSound: SoundResource;

  /** バトルスタート通知 */
  battleStartSubject: Subject<BattleStartPayload>;

  /** 排他制御 */
  exclusive: Exclusive;
};
