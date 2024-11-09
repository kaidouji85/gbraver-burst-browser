import { Exclusive } from "../../exclusive/exclusive";
import { SoundResource } from "../../resource/sound/resource";
import { SEPlayer } from "../../se/se-player";

/** 専用画面用ハンバーガーメニューのプロパティ */
export type BattleHamburgerMenuProps = {
  /** ルート要素 */
  readonly root: HTMLElement;
  /** ハンバーガーアイコン */
  readonly hamburgerIcon: HTMLElement;
  /** メニュー */
  readonly menu: HTMLElement;
  /** バックグラウンド */
  readonly background: HTMLElement;

  /** リトライ確認ダイアログ */
  readonly retryConfirmDialog: HTMLElement;
  /** リトライ確認ダイアログ 閉じるボタン */
  readonly retryConfirmDialogCloser: HTMLElement;
  /** リトライ確認ダイアログ リトライボタン */
  readonly retryButton: HTMLElement;
  /** リトライ確認ダイアログ キャンセルボタン */
  readonly retryCancelButton: HTMLElement;

  /** SE再生オブジェクト */
  readonly se: SEPlayer;
  /** 効果音 値変更 */
  readonly changeValueSound: SoundResource;

  /** 排他制御 */
  readonly exclusive: Exclusive;
};
