import { Subject } from "rxjs";

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

  /** ローカル対戦ホストが選択されたことを通知する */
  localBattleHostSelection: Subject<void>;

  /** 排他制御 */
  exclusive: Exclusive;
};
