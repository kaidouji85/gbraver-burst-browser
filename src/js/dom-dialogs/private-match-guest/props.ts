import { Resources } from "../../resource";
import { ROOT_CLASS } from "./dom/class-name";
import { rootInnerHtml } from "./dom/root-inner-html";

/** プライベートマッチゲストダイアログのプロパティ */
export type PrivateMatchGuestDialogProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
};

/**
 * PrivateMatchGuestDialogPropsを生成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createPrivateMatchGuestDialogProps(
  resources: Resources
): PrivateMatchGuestDialogProps {
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHtml(resources);
  return { root };
}
