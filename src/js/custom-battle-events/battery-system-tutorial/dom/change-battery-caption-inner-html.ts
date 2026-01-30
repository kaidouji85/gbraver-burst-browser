import { ROOT_CLASS as MESSAGE_WINDOW_ROOT } from "../../../game-dom/message-window/dom/class-name";
import template from "./change-battery-caption-inner-html.hbs";

/**
 * バッテリー値変更キャプションのinnerHTMLを生成する
 * @returns 生成した innerHTML
 */
export function changeBatteryCaptionInnerHtml(): string {
  return template({
    MESSAGE_WINDOW_ROOT,
  });
}
