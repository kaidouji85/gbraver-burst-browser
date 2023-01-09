import type { Resources } from "../../../../resource";
import { genesisBraverSPAttack } from "../mesh/sp-attack";
import { genesisBraverSPCharge } from "../mesh/sp-charge";
import { genesisBraverSPTOStand } from "../mesh/sp-to-stand";
import { genesisBraverStand } from "../mesh/stand";
import type { AnimationMeshMapping } from "./animation-mesh-mapping";

/**
 * アニメーションメッシュマッピングを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createMeshes(resources: Resources): AnimationMeshMapping[] {
  return [
    {
      type: "STAND",
      mesh: genesisBraverStand(resources),
    },
    {
      type: "SP_CHARGE",
      mesh: genesisBraverSPCharge(resources),
    },
    {
      type: "SP_ATTACK",
      mesh: genesisBraverSPAttack(resources),
    },
    {
      type: "SP_TO_STAND",
      mesh: genesisBraverSPTOStand(resources),
    },
  ];
}
