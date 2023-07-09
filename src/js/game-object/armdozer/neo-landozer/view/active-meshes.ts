import type { Resources } from "../../../../resource";
import { neoLandozerActiveFrontStep } from "../mesh/front-step";
import { neoLandozerActiveGuard } from "../mesh/guard";
import { neoLandozerActiveGutsDown } from "../mesh/guts-down";
import { neoLandozerActiveGutsUp } from "../mesh/guts-up";
import { neoLandozerActiveKnockBack } from "../mesh/knock-back";
import { neoLandozerActiveStand } from "../mesh/stand";
import type { AnimationMeshMapping } from "./animation-mesh-mapping";
import {neoLandozerActiveHMCharge} from "../mesh/hm-charge";
import {neoLandozerActiveHMAttack} from "../mesh/hm-attack";
import {neoLandozerActiveHMToStand} from "../mesh/hm-to-stand";

/**
 * アクティブアニメーションメッシュを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createActiveMeshes(
  resources: Resources,
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
      type: "HM_CHARGE",
      mesh: neoLandozerActiveHMCharge(resources),
    },
    {
      type: "HM_ATTACK",
      mesh: neoLandozerActiveHMAttack(resources),
    },
    {
      type: "HM_TO_STAND",
      mesh: neoLandozerActiveHMToStand(resources),
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
