import { ROOT_CLASS } from "./class-name";
import template from "./root-inner-html.hbs";

/**
 * ルートHTML要素のinnerHTMLを生成する
 * @returns 生成結果
 */
export const rootInnerHTML = (): string => {
  return template({
    ROOT_CLASS,
  });
};
