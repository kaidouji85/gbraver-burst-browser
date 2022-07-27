// @flow
import {MessageWindow} from "../../../../../game-dom/message-window/message-window";
import type {Resources} from "../../../../../resource";

/** HTML要素レイヤー */
export class DOMLayer {
  /** @deprecated */
  messageWindow: MessageWindow;
  rightMessageWindow: MessageWindow;
  leftMessageWindow: MessageWindow;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.messageWindow = new MessageWindow({resources, position: 'Right', facePosition: 'Right', faceOrientation: 'Left'});
    this.messageWindow.visible(false);

    this.rightMessageWindow = new MessageWindow({resources, position: 'Right', facePosition: 'Right', faceOrientation: 'Left'});
    this.rightMessageWindow.visible(false);

    this.leftMessageWindow = new MessageWindow({resources, position: 'Left', facePosition: 'Left', faceOrientation: 'Right'});
    this.leftMessageWindow.visible(false);
  }

  /**
   * シーンに追加するHTML要素群を取得する
   *
   * @return シーンに追加するHTML要素群
   */
  getHTMLElements(): HTMLElement[] {
    return [this.messageWindow.getRootHTMLElement(), this.rightMessageWindow.getRootHTMLElement(),
      this.leftMessageWindow.getRootHTMLElement()];
  }
}