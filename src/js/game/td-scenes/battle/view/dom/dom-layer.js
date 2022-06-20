// @flow
import {MessageWindow} from "../../../../../game-dom/message-window/message-window";

/** HTML要素レイヤー */
export class DOMLayer {
  messageWindow: MessageWindow;

  /**
   * コンストラクタ
   */
  constructor() {
    this.messageWindow = new MessageWindow();
    this.messageWindow.messages(['1行目', '2行目', '3行目']); // TODO 開発が終わったら戻す
  }

  /**
   * シーンに追加するHTML要素群を取得する
   *
   * @return シーンに追加するHTML要素群
   */
  getHTMLElements(): HTMLElement[] {
    return [this.messageWindow.getRootHTMLElement()];
  }
}