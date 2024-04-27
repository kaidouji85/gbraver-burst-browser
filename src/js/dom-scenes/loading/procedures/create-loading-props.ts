import { domUuid } from "../../../uuid/dom-uuid";
import { extractElements } from "../dom/elements";
import { rootInnerHTML } from "../dom/root-inner-html";
import { LoadingProps } from "../props";

/**
 * ローディング画面プロパティを生成する
 * @returns 生成結果
 */
export function createLoadingProps(): LoadingProps {
  const completedRate = 0;
  const ids = { text: domUuid(), bar: domUuid() };
  const root = document.createElement("div");
  root.innerHTML = rootInnerHTML(ids);
  root.className = "loading";
  root.style.display = "flex";
  const elements = extractElements(root, ids);
  return {
    ...elements,
    root,
    completedRate,
  };
}
