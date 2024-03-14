import { ROOT_CLASS as MESSAGE_WINDOW_ROOT } from "../game-dom/message-window/dom/class-name";
import template from "./yoroshiku-onegai-shimasu.hbs";

/**
 * メッセージウインドウのinnerHTMLで使う「よろしくお願いします」を生成する
 * @returns 生成したinnerHTML
 */
export const yoroshikuOnegaiShimasu = (): string =>
  template({
    MESSAGE_WINDOW_ROOT,
  });
