import { Exclusive } from "../../exclusive/exclusive";
import { SoundResource } from "../../resource/sound/resource";
import { SEPlayerContainer } from "../../se/se-player";

/** ローカル対戦セレクターダイアログのプロパティ */
export type LocalBattleSelectorDialogProps = SEPlayerContainer & {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** ローカル対戦ホストボタン */
  localBattleHostButton: HTMLButtonElement;

  /** ボタン押下時のサウンド */
  pushButtonSound: SoundResource;

  /** 排他制御 */
  exclusive: Exclusive;
};
