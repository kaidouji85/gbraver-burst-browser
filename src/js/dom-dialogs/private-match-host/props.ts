/** プライベートマッチホストダイアログのプロパティ */
import { ROOT_CLASS } from "./dom/class-name";
import { rootInnerHTML } from "./dom/inner-html";
import {Resources} from "../../resource";

export type PrivateMatchHostDialogProps = {
  /** ルート要素HTML */
  root: HTMLElement;
};

/**
 * PrivateMatchHostDialogPropsを生成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createPrivateMatchHostDialogProps(resources: Resources): PrivateMatchHostDialogProps {
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHTML(resources);
  return { root };
}
