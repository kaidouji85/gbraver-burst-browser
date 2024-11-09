import { BattleHamburgerMenu } from "../../../../game-dom/battle-hamburger-menu";
import { MessageWindow } from "../../../../game-dom/message-window";
import { MiniController } from "../../../../game-dom/mini-controller";

/** DOMレイヤーのプロパティ */
export type DOMLayerProps = {
  /** メッセージウインドウ 右 */
  rightMessageWindow: MessageWindow;
  /** メッセージウインドウ 左 */
  leftMessageWindow: MessageWindow;
  /** メッセージウインドウ バッテリーセレクタ隣 */
  nearBatterySelectorMessageWindow: MessageWindow;
  /** メッセージウインドウ バーストボタン隣 */
  nearBurstButtonMessageWindow: MessageWindow;
  /** メッセージウインドウ パイロットボタン隣 */
  nearPilotButtonMessageWindow: MessageWindow;
  /** 叫びメッセージウインドウ プレイヤー */
  playerShoutMessageWindow: MessageWindow;
  /** 叫びメッセージウインドウ 敵 */
  enemyShoutMessageWindow: MessageWindow;

  /** ハンバーガーメニュー */
  hamburgerMenu: BattleHamburgerMenu;

  /** ミニコントローラー */
  miniController: MiniController;
};
