import { ROOT_CLASS as MESSAGE_WINDOW_ROOT } from "../../../game-dom/message-window/dom/class-name";
import template from "./push-attack-button-caption-inner.hbs";

/**
 * コウゲキボタンを押すキャプションのinnerHTMLを生成する
 * @returns 生成した innerHTML
 */
export function pushAttackButtonCaptionInnerHtml(): string {
  return template({
    MESSAGE_WINDOW_ROOT,
  });
}
