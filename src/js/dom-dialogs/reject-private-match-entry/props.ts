import { ROOT_CLASS } from "./dom/class-name";
import { rootInnerHTML } from "./dom/root-inner-html";

/** RejectPrivateMatchEntryDialogのプロパティ */
export type RejectPrivateMatchEntryDialogProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
};

/**
 * RejectPrivateMatchEntryDialogPropsを生成する
 * @return 生成結果
 */
export function createRejectPrivateMatchEntryDialogProps(): RejectPrivateMatchEntryDialogProps {
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHTML();
  return { root };
}
