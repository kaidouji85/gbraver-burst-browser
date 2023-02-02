import { Resources } from "../../resource";
import { ROOT_CLASS } from "./dom/class-name";
import { rootInnerHTML } from "./dom/root-inner-html";

/** ネットバトルセレクターのプロパティ */
export type NetBattleSelectrProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
};

/**
 * NetBattleSelectrPropsを生成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createNetBattleSelectrProps(
  resources: Resources
): NetBattleSelectrProps {
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHTML(resources);
  return { root };
}
