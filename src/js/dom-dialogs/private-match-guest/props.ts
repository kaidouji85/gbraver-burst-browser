/** プライベートマッチゲストダイアログのプロパティ */
import {ROOT_CLASS} from "./dom/class-name";
import {rootInnerHtml} from "./dom/root-inner-html";

export type PrivateMatchGuestDialogProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
};

/**
 * PrivateMatchGuestDialogPropsを生成する
 * @return 生成結果
 */
export function createPrivateMatchGuestDialogProps(): PrivateMatchGuestDialogProps {
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHtml();
  return { root };
}