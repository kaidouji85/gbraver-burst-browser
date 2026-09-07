import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";
import { SoundResource } from "../../resource/sound/resource";
import { SEPlayerContainer } from "../../se/se-player";

/** あいことば対戦セレクターダイアログのプロパティ */
export type PasswordMatchSelectorDialogProps = SEPlayerContainer & {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** クロージャー */
  closer: HTMLElement;
  /** バックグラウンド */
  backGround: HTMLElement;
  /** あいことば対戦ホストボタン */
  hostButton: HTMLButtonElement;
  /** あいことば対戦ゲストボタン */
  guestButton: HTMLButtonElement;

  /** ボタン押下時のサウンド */
  pushButtonSound: SoundResource;
  /** ダイアログクローズ時のサウンド */
  closeButtonSound: SoundResource;

  /** あいことば対戦ホストが選択されたことを通知する */
  hostSelection: Subject<void>;
  /** あいことば対戦ゲストが選択されたことを通知する */
  guestSelection: Subject<void>;
  /** ダイアログが閉じられたことを通知する */
  dialogClosed: Subject<void>;

  /** 排他制御 */
  exclusive: Exclusive;
};
