import { Exclusive } from "../../exclusive/exclusive";
import { SoundResource } from "../../resource/sound/resource";
import { SEPlayerContainer } from "../../se/se-player";

/** ローカル対戦ゲストダイアログのプロパティ */
export type LocalBattleGuestDialogProps = SEPlayerContainer &{
  /** ルートHTML要素 */
  root: HTMLElement;
  /** バトルスタートボタン */
  battleStartButton: HTMLElement;

  /** バトルスタートボタンを押したときのサウンド */
  battleStartSound: SoundResource;

  /** 排他制御 */
  exclusive: Exclusive;
};
