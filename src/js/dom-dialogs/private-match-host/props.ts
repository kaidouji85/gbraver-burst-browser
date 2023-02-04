/** プライベートマッチホストダイアログのプロパティ */
import { ROOT_CLASS } from "./dom/class-name";
import { rootInnerHTML } from "./dom/inner-html";

export type PrivateMatchHostDialogProps = {
  /** ルート要素HTML */
  root: HTMLElement;
};

/**
 * PrivateMatchHostDialogPropsを生成する
 * @return 生成結果
 */
export function createPrivateMatchHostDialogProps(): PrivateMatchHostDialogProps {
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHTML();
  return { root };
}
