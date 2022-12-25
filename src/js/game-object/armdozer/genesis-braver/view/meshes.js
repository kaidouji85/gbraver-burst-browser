// @flow

import type { Resources } from "../../../../resource";
import { genesisBraverSPAttack } from "../mesh/sp-attack";
import { genesisBraverStraightPunch } from "../mesh/sp-charge";
import { genesisBraverStand } from "../mesh/stand";
import type { AnimationMeshMapping } from "./animation-mesh-mapping";

/**
 * アニメーションメッシュマッピングを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createMeshes(resources: Resources): AnimationMeshMapping[] {
  return [
    { type: "STAND", mesh: genesisBraverStand(resources) },
    { type: "SP_CHARGE", mesh: genesisBraverStraightPunch(resources) },
    { type: "SP_ATTACK", mesh: genesisBraverSPAttack(resources) },
  ];
}
