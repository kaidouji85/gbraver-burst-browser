import { Resources } from "../../../../resource";
import { genesisBraverActiveKnockBack } from "../mesh/knock-back";
import { genesisBraverActiveSPAttack } from "../mesh/sp-attack";
import { genesisBraverActiveSPCharge } from "../mesh/sp-charge";
import { genesisBraverActiveSPToStand } from "../mesh/sp-to-stand";
import { genesisBraverActiveStand } from "../mesh/stand";
import { AnimationMeshMapping } from "./animation-mesh-mapping";

/**
 * アニメーションアクティブメッシュマッピング生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createActiveMeshes(
  resources: Resources
): AnimationMeshMapping[] {
  return [
    {
      type: "STAND",
      mesh: genesisBraverActiveStand(resources),
    },
    {
      type: "SP_CHARGE",
      mesh: genesisBraverActiveSPCharge(resources),
    },
    {
      type: "SP_ATTACK",
      mesh: genesisBraverActiveSPAttack(resources),
    },
    {
      type: "SP_TO_STAND",
      mesh: genesisBraverActiveSPToStand(resources),
    },
    {
      type: "KNOCK_BACK",
      mesh: genesisBraverActiveKnockBack(resources),
    },
  ];
}
