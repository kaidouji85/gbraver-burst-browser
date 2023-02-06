import { Exclusive } from "../../exclusive/exclusive";
import { Resources } from "../../resource";
import { domUuid } from "../../uuid/dom-uuid";
import { ROOT_CLASS } from "./dom/class-name";
import { DataIDs } from "./dom/data-ids";
import { extractElements } from "./dom/elements";
import { rootInnerHtml } from "./dom/root-inner-html";

/** プライベートマッチゲストダイアログのプロパティ */
export type PrivateMatchGuestDialogProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** クロージャ */
  closer: HTMLElement;
  /** 背景 */
  background: HTMLElement;
  /** プライベートマット開始ボタン */
  enterButton: HTMLElement;
  /** 排他制御 */
  exclusive: Exclusive;
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
  const dataIDs: DataIDs = {
    closer: domUuid(),
    background: domUuid(),
    enterButton: domUuid(),
  };
  root.innerHTML = rootInnerHtml(resources, dataIDs);
  const elements = extractElements(root, dataIDs);
  return { ...elements, root, exclusive: new Exclusive() };
}
