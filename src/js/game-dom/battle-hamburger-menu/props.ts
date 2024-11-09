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

  /** SE再生オブジェクト */
  readonly se: SEPlayer;
  /** 効果音 値変更 */
  readonly changeValueSound: SoundResource;
};
