import type { FaceType } from "./face-graphic/config/face-type";
import { darken } from "./procedure/darken";
import { face } from "./procedure/face";
import { faceVisible } from "./procedure/face-visible";
import { lighten } from "./procedure/lighten";
import { messages } from "./procedure/messages";
import { messagesInInnerHtml } from "./procedure/messages-in-inner-html";
import { nextMessageIconVisible } from "./procedure/next-message-icon-visible";
import { scrollUp } from "./procedure/scroll-up";
import { visible } from "./procedure/visible";
import {
  createMessageWindowProps,
  MessageWindowProps,
  PropsCreatorParams,
} from "./props";

/** コンストラクタのパラメータ */
type MessageWindowParams = PropsCreatorParams;

/** メッセージウインドウ */
export class MessageWindow {
  /** プロパティ */
  #props: MessageWindowProps;

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: MessageWindowParams) {
    this.#props = createMessageWindowProps(params);
  }

  /**
   * ルートHTML要素を取得する
   * @returns 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * 表示、非表示を設定する
   * @param isVisible trueで表示する
   */
  visible(isVisible: boolean): void {
    visible(this.#props, isVisible);
  }

  /**
   * メッセージを配列形式で設定する
   * 配列の区切れで改行をする
   * @param values メッセージ
   */
  messages(values: string[]): void {
    messages(this.#props, values);
  }

  /**
   * メッセージをinnerHTMLで指定する
   * @param innerHTML 指定するHTML
   */
  messagesInInnerHTML(innerHTML: string): void {
    messagesInInnerHtml(this.#props, innerHTML);
  }

  /**
   * メッセージを上スクロールする
   * @returns アニメーションが完了したら発火するPromise
   */
  async scrollUp(): Promise<void> {
    await scrollUp(this.#props);
  }

  /**
   * 顔画像を変更する
   * @param faceType 変更する顔画像
   */
  face(faceType: FaceType): void {
    face(this.#props, faceType);
  }

  /**
   * 顔画像の表示、非表示設定
   *
   * @param isVisible 顔画像表示フラグ、trueで表示する
   */
  faceVisible(isVisible: boolean): void {
    faceVisible(this.#props, isVisible);
  }

  /**
   * 次メッセージアイコンの表示、非表示設定
   *
   * @param isNextMessageIconVisible 次メッセージアイコンを表示するか、trueで表示する
   */
  nextMessageIconVisible(isNextMessageIconVisible: boolean): void {
    nextMessageIconVisible(this.#props, isNextMessageIconVisible);
  }

  /**
   * ウインドウを暗くする
   */
  darken(): void {
    darken(this.#props);
  }

  /**
   * ウインドウを標準の明るさにする
   */
  lighten(): void {
    lighten(this.#props);
  }
}
