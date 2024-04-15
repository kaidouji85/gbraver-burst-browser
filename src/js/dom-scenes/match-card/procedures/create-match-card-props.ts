import { ArmdozerId } from "gbraver-burst-core";

import { getArmdozerIconPathId } from "../../../path/armdozer-icon-path";
import { Resources } from "../../../resource";
import { domUuid } from "../../../uuid/dom-uuid";
import { waitElementLoaded } from "../../../wait/wait-element-loaded";
import { extractElements } from "../dom/elements";
import { rootInnerHTML } from "../dom/root-inner-html";
import { MatchCardProps } from "../props";

/** マッチカード画面プロパティの生成パラメータ */
export type PropsCreatorParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** プレイヤー情報 */
  player: ArmdozerId;
  /** 敵情報 */
  enemy: ArmdozerId;
  /** キャプション */
  caption: string;
};

/**
 * マッチカード画面プロパティを生成する
 * @params params パラメータ
 * @return 生成結果
 */
export function createMatchCardProps(
  params: PropsCreatorParams,
): MatchCardProps {
  const ids = { player: domUuid(), enemy: domUuid() };
  const root = document.createElement("div");
  root.className = "match-card";
  root.innerHTML = rootInnerHTML(ids, params.caption);
  const elements = extractElements(root, ids);
  const isPlayerLoaded = waitElementLoaded(elements.player);
  const playerIconPathId = getArmdozerIconPathId(params.player);
  elements.player.src =
    params.resources.paths.find((v) => v.id === playerIconPathId)?.path ?? "";
  const isEnemyLoaded = waitElementLoaded(elements.enemy);
  const enemyIconPathId = getArmdozerIconPathId(params.enemy);
  elements.enemy.src =
    params.resources.paths.find((v) => v.id === enemyIconPathId)?.path ?? "";
  return {
    root,
    isPlayerLoaded,
    isEnemyLoaded,
  };
}
