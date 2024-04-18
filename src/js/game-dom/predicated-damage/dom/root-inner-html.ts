import { ROOT } from "./class-name";
import rootInnerHTMLTemplate from "./root-inner-html.hbs";

/**
 * ルートHTML要素のinnerHTMLを生成する
 * @return 生成結果
 */
export function rootInnerHTML(): string {
  return rootInnerHTMLTemplate({
    ROOT,
  });
}
