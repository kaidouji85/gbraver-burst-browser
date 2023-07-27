import { ArmDozerId } from "gbraver-burst-core";

import { getArmdozerIconPathId } from "../../../path/armdozer-icon-path";
import { Resources } from "../../../resource";
import { domUuid } from "../../../uuid/dom-uuid";
import { waitElementLoaded } from "../../../wait/wait-element-loaded";
import { extractElements } from "../dom/elements";
import { rootInnerHTML } from "../dom/root-inner-html";
import { MatchCardProps } from "../props";

/** マッチカード画面プロパティの生成パラメータ */
export type GenerateMatchCardPropsParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** プレイヤー情報 */
  player: ArmDozerId;
  /** 敵情報 */
  enemy: ArmDozerId;
  /** キャプション */
  caption: string;
};

/**
 * マッチカード画面プロパティを生成する
 * @param param パラメータ
 * @return 生成結果
 */
export function createMatchCardProps(
  param: GenerateMatchCardPropsParams,
): MatchCardProps {
  const ids = { player: domUuid(), enemy: domUuid() };
  const root = document.createElement("div");
  root.className = "match-card";
  root.innerHTML = rootInnerHTML(ids, param.caption);
  const elements = extractElements(root, ids);
  const isPlayerLoaded = waitElementLoaded(elements.player);
  const playerIconPath = getArmdozerIconPathId(param.player);
  const playerIconResource = param.resources.paths.find(
    (v) => v.id === playerIconPath,
  );
  elements.player.src = playerIconResource ? playerIconResource.path : "";
  const isEnemyLoaded = waitElementLoaded(elements.enemy);
  const enemyIconPath = getArmdozerIconPathId(param.enemy);
  const enemyIconResource = param.resources.paths.find(
    (v) => v.id === enemyIconPath,
  );
  elements.enemy.src = enemyIconResource ? enemyIconResource.path : "";
  return {
    root,
    isPlayerLoaded,
    isEnemyLoaded,
  };
}