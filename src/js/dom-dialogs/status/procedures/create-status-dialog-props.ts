import { Subject } from "rxjs";

import { Exclusive } from "../../../exclusive/exclusive";
import { ROOT } from "../dom/class-name";
import { extractBackGround, extractCloser } from "../dom/elements";
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
  const backGround = extractBackGround(root);
  const closer = extractCloser(root);

  const exclusive = new Exclusive();

  const closeNotifier = new Subject<void>();

  return { root, backGround, closer, exclusive, closeNotifier };
}
