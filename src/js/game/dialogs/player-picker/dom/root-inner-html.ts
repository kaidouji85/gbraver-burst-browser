import { ROOT } from "./class-name";
import template from "./root-inner-html.hbs";

/** ルートHTML要素のinner HTML生成オプション */
export type RootInnerHTMLOptions = {
  /** 決定ボタンのラベル */
  confirmLabel: string;
  /** 閉じるボタンのラベル */
  closeLabel: string;
};

/**
 * ルートHTML要素のinner HTMLを生成する
 * @param options ルートHTML要素のinner HTML生成オプション
 * @returns inner HTML
 */
export const rootInnerHTML = (options: RootInnerHTMLOptions) => {
  const { confirmLabel, closeLabel } = options;
  return template({
    ROOT,
    confirmLabel,
    closeLabel,
  });
};
