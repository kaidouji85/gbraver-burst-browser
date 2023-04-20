import { domUuid } from "../../uuid/dom-uuid";
import { ROOT } from "./dom/class-name";
import { extractElements } from "./dom/elements";
import { rootInnerHTML } from "./dom/root-inner-html";

/** ミニコントローラープロパティ */
export type MiniControllerProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** バッテリーコマンドを集めたもの */
  batteries: HTMLElement;
  /** バーストコマンド */
  burst: HTMLElement;
  /** パイロットコマンド */
  pilot: HTMLElement;
};

/**
 * ミニコントローラープロパティを生成する
 * @return 生成結果
 */
export function createMiniControllerProps(): MiniControllerProps {
  const root = document.createElement("div");
  root.className = ROOT;
  const ids = { batteries: domUuid(), burst: domUuid(), pilot: domUuid() };
  root.innerHTML = rootInnerHTML(ids);
  const elements = extractElements(root, ids);
  return {
    ...elements,
    root,
  };
}
