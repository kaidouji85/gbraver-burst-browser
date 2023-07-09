import { Resources } from "../../../../resource";
import { neoLandozerOutlineFrontStep } from "../mesh/front-step";
import { neoLandozerOutlineGuard } from "../mesh/guard";
import { neoLandozerOutlineGutsDown } from "../mesh/guts-down";
import { neoLandozerOutlineGutsUp } from "../mesh/guts-up";
import { neoLandozerOutlineKnockBack } from "../mesh/knock-back";
import { neoLandozerOutlineStand } from "../mesh/stand";
import { AnimationMeshMapping } from "./animation-mesh-mapping";
import {neoLandozerOutlineHMCharge} from "../mesh/hm-charge";
import {neoLandozerOutlineHMAttack} from "../mesh/hm-attack";
import {neoLandozerOutlineHMToStand} from "../mesh/hm-to-stand";
import {neoLandozerOutlineDown} from "../mesh/down";

/**
 * アウトラインアニメーションメッシュを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createOutlineMeshes(
  resources: Resources,
): AnimationMeshMapping[] {
  return [
    {
      type: "STAND",
      mesh: neoLandozerOutlineStand(resources),
    },
    {
      type: "KNOCK_BACK",
      mesh: neoLandozerOutlineKnockBack(resources),
    },
    {
      type: "GUARD",
      mesh: neoLandozerOutlineGuard(resources),
    },
    {
      type: "HM_CHARGE",
      mesh: neoLandozerOutlineHMCharge(resources),
    },
    {
      type: "HM_ATTACK",
      mesh: neoLandozerOutlineHMAttack(resources),
    },
    {
      type: "HM_TO_STAND",
      mesh: neoLandozerOutlineHMToStand(resources),
    },
    {
      type: "DOWN",
      mesh: neoLandozerOutlineDown(resources),
    },
    {
      type: "GUTS_UP",
      mesh: neoLandozerOutlineGutsUp(resources),
    },
    {
      type: "GUTS_DOWN",
      mesh: neoLandozerOutlineGutsDown(resources),
    },
    {
      type: "FRONT_STEP",
      mesh: neoLandozerOutlineFrontStep(resources),
    },
  ];
}
