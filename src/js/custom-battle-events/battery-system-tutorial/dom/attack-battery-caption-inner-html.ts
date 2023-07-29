import { ROOT_CLASS as MESSAGE_WINDOW_ROOT } from "../../../game-dom/message-window/dom/class-name";
import { Resources } from "../../../resource";
import template from "./attack-battery-caption-inner-html.hbs";

/**
 * 攻撃バッテリー注釈の innerHTML を生成する
 * @param resources リソース管理オブジェクト
 * @returns 生成した innerHTML
 */
export function attackBatteryCaptionInnerHtml(
  resources: Resources
): string {
  return template({
    MESSAGE_WINDOW_ROOT
  });
}
