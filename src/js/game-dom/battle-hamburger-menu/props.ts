import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";
import { SoundResource } from "../../resource/sound/resource";
import { SEPlayer } from "../../se/se-player";

/** 専用画面用ハンバーガーメニューのプロパティ */
export type BattleHamburgerMenuProps = {
  /** リトライ可能かどうか、trueで可能 */
  readonly canRetry: boolean;
  /** バトルシミュレーターが開始できるか否か、trueで可能 */
  canBattleSimulatorStart: boolean;

  /** ルート要素 */
  readonly root: HTMLElement;
  /** ハンバーガーアイコン */
  readonly hamburgerIcon: HTMLElement;
  /** メニュー */
  readonly menu: HTMLElement;
  /** バックグラウンド */
  readonly background: HTMLElement;
  /** バトルシミュレーター */
  readonly battleSimulator: HTMLElement;

  /** リトライ確認ダイアログ */
  readonly retryConfirmDialog: HTMLElement;
  /** リトライ確認ダイアログ 閉じるボタン */
  readonly retryConfirmDialogCloser: HTMLElement;
  /** リトライ確認ダイアログ リトライボタン */
  readonly retryButton: HTMLElement;
  /** リトライ確認ダイアログ キャンセルボタン */
  readonly retryCancelButton: HTMLElement;

  /** バトル終了確認ダイアログ */
  readonly endBattleConfirmDialog: HTMLElement;
  /** バトル終了確認ダイアログ 閉じるボタン */
  readonly endBattleConfirmDialogCloser: HTMLElement;
  /** バトル終了確認ダイアログ バトル終了ボタン */
  readonly endBattleButton: HTMLElement;
  /** バトル終了確認ダイアログ キャンセルボタン */
  readonly endBattleCancelButton: HTMLElement;

  /** SE再生オブジェクト */
  readonly se: SEPlayer;
  /** 効果音 値変更 */
  readonly changeValueSound: SoundResource;
  /** 効果音 決定 */
  readonly decideSound: SoundResource;

  /** 排他制御 */
  readonly exclusive: Exclusive;

  /** バトルシミュレーター開始通知 */
  readonly battleSimulatorStartNotifier: Subject<void>;
  /** リトライ通知 */
  readonly retryNotifier: Subject<void>;
  /** バトル終了通知 */
  readonly endBattleNotifier: Subject<void>;
};
