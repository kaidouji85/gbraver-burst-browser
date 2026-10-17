import { ROOT_CLASS } from "./class-name";
import template from "./root-inner-html.hbs";

/** ルートinnerHTML要素のオプション */
export type RootInnerHtmlOptions = {
  /** ネットワークエラー後のボタンラベル */
  postNetworkErrorLabel: string;
};

/**
 * ルートinnerHTML要素を生成する関数
 * @param options オプション
 * @returns 生成結果
 */
export const rootInnerHtml = (options: RootInnerHtmlOptions) => {
  const { postNetworkErrorLabel } = options;
  return template({
    ROOT_CLASS,
    postNetworkErrorLabel,
  });
};
