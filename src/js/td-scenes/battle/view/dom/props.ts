import { MessageWindow } from "../../../../game-dom/message-window";
import { MiniController } from "../../../../game-dom/mini-controller";
import { PredicatedDamage } from "../../../../game-dom/predicated-damage";

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
  /** ミニコントローラー */
  miniController: MiniController;
  /** ダメージ予想 */
  predicatedDamage: PredicatedDamage;
};
