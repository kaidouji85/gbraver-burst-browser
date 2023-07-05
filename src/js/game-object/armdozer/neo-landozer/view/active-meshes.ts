import type { Resources } from "../../../../resource";
import { neoLandozerActiveFrontStep } from "../mesh/front-step";
import { neoLandozerActiveGuard } from "../mesh/guard";
import { neoLandozerActiveGutsDown } from "../mesh/guts-down";
import { neoLandozerActiveGutsUp } from "../mesh/guts-up";
import { neoLandozerActiveKnockBack } from "../mesh/knock-back";
import { neoLandozerActiveStand } from "../mesh/stand";
import type { AnimationMeshMapping } from "./animation-mesh-mapping";

/**
 * アクティブアニメーションメッシュを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createActiveMeshes(
  resources: Resources
): AnimationMeshMapping[] {
  return [
    {
      type: "STAND",
      mesh: neoLandozerActiveStand(resources),
    },
    {
      type: "KNOCK_BACK",
      mesh: neoLandozerActiveKnockBack(resources),
    },
    {
      type: "GUARD",
      mesh: neoLandozerActiveGuard(resources),
    },
    {
      type: "GUTS_UP",
      mesh: neoLandozerActiveGutsUp(resources),
    },
    {
      type: "GUTS_DOWN",
      mesh: neoLandozerActiveGutsDown(resources),
    },
    {
      type: "FRONT_STEP",
      mesh: neoLandozerActiveFrontStep(resources),
    },
  ];
}
