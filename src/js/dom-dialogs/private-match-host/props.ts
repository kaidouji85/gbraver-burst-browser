/** プライベートマッチホストダイアログのプロパティ */
import { Resources } from "../../resource";
import { ROOT_CLASS } from "./dom/class-name";
import { rootInnerHTML } from "./dom/inner-html";

export type PrivateMatchHostDialogProps = {
  /** ルート要素HTML */
  root: HTMLElement;
};

/**
 * PrivateMatchHostDialogPropsを生成する
 * @param resources リソース管理オブジェクト
 * @param roomID ルームID
 * @return 生成結果
 */
export function createPrivateMatchHostDialogProps(
  resources: Resources,
  roomID: string
): PrivateMatchHostDialogProps {
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHTML(resources, roomID);
  return { root };
}
