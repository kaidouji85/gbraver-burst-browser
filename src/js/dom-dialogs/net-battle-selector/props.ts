import { Exclusive } from "../../exclusive/exclusive";
import { Resources } from "../../resource";
import { domUuid } from "../../uuid/dom-uuid";
import { ROOT_CLASS } from "./dom/class-name";
import { extractElements } from "./dom/elements";
import { rootInnerHTML } from "./dom/root-inner-html";

/** ネットバトルセレクターのプロパティ */
export type NetBattleSelectrProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** 背景 */
  backGround: HTMLElement;
  /** クロージャ */
  closer: HTMLElement;
  /** カジュアルマッチボタン */
  casualMatchButton: HTMLElement;
  /** プライベートマッチボタン */
  privateMatchButton: HTMLElement;
  /** 排他制御 */
  exclusive: Exclusive;
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
  const dataIDs = {
    backGround: domUuid(),
    closer: domUuid(),
    casualMatchButton: domUuid(),
    privateMatchButton: domUuid(),
  };
  root.innerHTML = rootInnerHTML(resources, dataIDs);
  const elements = extractElements(root, dataIDs);
  return {
    root,
    backGround: elements.backGround,
    closer: elements.closer,
    casualMatchButton: elements.casualMatchButton,
    privateMatchButton: elements.privateMatchButton,
    exclusive: new Exclusive(),
  };
}
