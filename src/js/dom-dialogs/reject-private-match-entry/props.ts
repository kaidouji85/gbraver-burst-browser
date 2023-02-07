import { Resources } from "../../resource";
import { domUuid } from "../../uuid/dom-uuid";
import { ROOT_CLASS } from "./dom/class-name";
import { DataIDs } from "./dom/data-ids";
import { rootInnerHTML } from "./dom/root-inner-html";

/** RejectPrivateMatchEntryDialogのプロパティ */
export type RejectPrivateMatchEntryDialogProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
};

/**
 * RejectPrivateMatchEntryDialogPropsを生成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createRejectPrivateMatchEntryDialogProps(
  resources: Resources
): RejectPrivateMatchEntryDialogProps {
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  const dataIDs: DataIDs = {
    closer: domUuid(),
    background: domUuid(),
    closeButton: domUuid(),
  };
  root.innerHTML = rootInnerHTML(resources, dataIDs);
  return { root };
}
