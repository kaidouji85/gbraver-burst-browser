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
  /** メッセージウインドウ バーストボタン隣 */
  nearBurstButtonMessageWindow: MessageWindow;
  /** メッセージウインドウ パイロットボタン隣 */
  nearPilotButtonMessageWindow: MessageWindow;

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

    this.nearBurstButtonMessageWindow = new MessageWindow({resources, position: 'NearBurstButton', facePosition: 'Right', faceOrientation: 'Left'});
    this.nearBurstButtonMessageWindow.visible(false);

    this.nearPilotButtonMessageWindow = new MessageWindow({resources, position: 'NearPilotButton', facePosition: 'Right', faceOrientation: 'Left'});
    this.nearPilotButtonMessageWindow.visible(false);
  }

  /**
   * シーンに追加するHTML要素群を取得する
   *
   * @return シーンに追加するHTML要素群
   */
  getHTMLElements(): HTMLElement[] {
    return [this.rightMessageWindow.getRootHTMLElement(), this.leftMessageWindow.getRootHTMLElement(),
      this.nearBatterySelectorMessageWindow.getRootHTMLElement(), this.nearBurstButtonMessageWindow.getRootHTMLElement(),
      this.nearPilotButtonMessageWindow.getRootHTMLElement()];
  }
}