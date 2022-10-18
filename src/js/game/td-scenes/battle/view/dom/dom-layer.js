// @flow
import {MessageWindow} from "../../../../../game-dom/message-window/message-window";
import type {Resources} from "../../../../../resource";

/** HTML要素レイヤー */
export class DOMLayer {
  /** メッセージウインドウ 右 */
  rightMessageWindow: MessageWindow;
  /** メッセージウインドウ 左 */
  leftMessageWindow: MessageWindow;
  /** メッセージウインドウ バッテリーセレクタ隣 */
  nearBatterySelectorMessageWindow: MessageWindow;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.rightMessageWindow = new MessageWindow({resources, position: 'Right', facePosition: 'Right', faceOrientation: 'Left'});
    this.rightMessageWindow.visible(false);

    this.leftMessageWindow = new MessageWindow({resources, position: 'Left', facePosition: 'Left', faceOrientation: 'Right'});
    this.leftMessageWindow.visible(false);

    this.nearBatterySelectorMessageWindow = new MessageWindow({resources, position: 'NearBatterySelector', facePosition: 'Left', faceOrientation: 'Right'});
    this.nearBatterySelectorMessageWindow.visible(false);
  }

  /**
   * シーンに追加するHTML要素群を取得する
   *
   * @return シーンに追加するHTML要素群
   */
  getHTMLElements(): HTMLElement[] {
    return [this.rightMessageWindow.getRootHTMLElement(), this.leftMessageWindow.getRootHTMLElement(),
      this.nearBatterySelectorMessageWindow.getRootHTMLElement()];
  }
}