import {
  ARMDOZER_UNSELECTED,
  OK_BUTTON_DISABLED,
  PILOT_UNSELECTED,
  ROOT,
} from "./class-name";
import template from "./root-inner-html.hbs";

/**
 * ルートHTML要素のinnerHTMLを生成する
 * @returns 生成結果
 */
export function rootInnerHTML(): string {
  return template({
    ROOT,
    ARMDOZER_UNSELECTED,
    PILOT_UNSELECTED,
    OK_BUTTON_DISABLED,
  });
}
