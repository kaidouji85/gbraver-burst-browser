import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";
import { SoundResource } from "../../resource/sound/resource";
import { SEPlayerContainer } from "../../se/se-player";

/** ローカル対戦セレクターダイアログのプロパティ */
export type LocalBattleSelectorDialogProps = SEPlayerContainer & {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** クロージャー */
  closer: HTMLElement;
  /** ローカル対戦ホストボタン */
  localBattleHostButton: HTMLButtonElement;
  /** ローカル対戦ゲストボタン */
  localBattleGuestButton: HTMLButtonElement;

  /** ボタン押下時のサウンド */
  pushButtonSound: SoundResource;
  /** ダイアログクローズ時のサウンド */
  closeButtonSound: SoundResource;

  /** ローカル対戦ホストが選択されたことを通知する */
  localBattleHostSelection: Subject<void>;
  /** ローカル対戦ゲストが選択されたことを通知する */
  localBattleGuestSelection: Subject<void>;
  /** ダイアログが閉じられたことを通知する */
  dialogClosed: Subject<void>;

  /** 排他制御 */
  exclusive: Exclusive;
};
