import { PostNetworkError } from "../../../post-network-error";
import { ROOT_CLASS } from "./class-name";
import { postNetworkErrorLabels } from "./post-network-error-labels";
import template from "./root-inner-html.hbs";

/** ルートinnerHTML要素のオプション */
export type RootInnerHtmlOptions = {
  /** エラーメッセージ */
  message?: string;
  /** ネットワークエラー後の処理 */
  postNetworkError: PostNetworkError;
};

/**
 * ルートinnerHTML要素を生成する関数
 * @param options オプション
 * @returns 生成結果
 */
export const rootInnerHtml = (options: RootInnerHtmlOptions) => {
  const { postNetworkError } = options;
  const message = options.message ?? "通信エラーが発生しました";
  const postNetworkErrorLabel =
    postNetworkErrorLabels[postNetworkError.type] ?? "";
  return template({
    ROOT_CLASS,
    message,
    postNetworkErrorLabel,
  });
};
