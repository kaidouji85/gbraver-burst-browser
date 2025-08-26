import { ROOT } from "../dom/class-name";
import { rootInnerHTML } from "../dom/root-inner-html";
import { StatusDialogProps } from "../props";

/**
 * ステータスダイアログのプロパティを生成する
 * @returns ステータスダイアログのプロパティ
 */
export function createStatusDialogProps(): StatusDialogProps {
  const root = document.createElement("div");
  root.className = ROOT;
  root.innerHTML = rootInnerHTML();
  return { root };
}
