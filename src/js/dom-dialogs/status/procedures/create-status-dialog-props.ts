import { ROOT } from "../dom/class-name";
import { rootInnerHTML, RootInnerHTMLOptions } from "../dom/root-inner-html";
import { StatusDialogProps } from "../props";

/** オプション */
export type StatusDialogPropsCreatorOptions = RootInnerHTMLOptions;

/**
 * ステータスダイアログのプロパティを生成する
 * @param options オプション
 * @returns ステータスダイアログのプロパティ
 */
export function createStatusDialogProps(
  options: StatusDialogPropsCreatorOptions,
): StatusDialogProps {
  const root = document.createElement("div");
  root.className = ROOT;
  root.innerHTML = rootInnerHTML(options);
  return { root };
}
