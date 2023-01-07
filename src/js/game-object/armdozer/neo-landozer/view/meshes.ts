import type { Resources } from "../../../../resource";
import { neoLandozerBackStep } from "../mesh/back-step";
import { neoLandozerDown } from "../mesh/down";
import { neoLandozerFrontStep } from "../mesh/front-step";
import { neoLandozerGuard } from "../mesh/guard";
import { neoLandozerGutsDown } from "../mesh/guts-down";
import { neoLandozerGutsUp } from "../mesh/guts-up";
import { neoLandozerHMAttack } from "../mesh/hm-attack";
import { neoLandozerHMCharge } from "../mesh/hm-charge";
import { neoLandozerHMToStand } from "../mesh/hm-to-stand";
import { neoLandozerKnockBack } from "../mesh/knock-back";
import { neoLandozerStand } from "../mesh/stand";
import type { AnimationMeshMapping } from "./animation-mesh-mapping";

/**
 * アニメーションメッシュを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createMeshes(resources: Resources): AnimationMeshMapping[] {
  return [{
    type: "STAND",
    mesh: neoLandozerStand(resources)
  }, {
    type: "KNOCK_BACK",
    mesh: neoLandozerKnockBack(resources)
  }, {
    type: "GUARD",
    mesh: neoLandozerGuard(resources)
  }, {
    type: "HM_CHARGE",
    mesh: neoLandozerHMCharge(resources)
  }, {
    type: "HM_ATTACK",
    mesh: neoLandozerHMAttack(resources)
  }, {
    type: "HM_TO_STAND",
    mesh: neoLandozerHMToStand(resources)
  }, {
    type: "DOWN",
    mesh: neoLandozerDown(resources)
  }, {
    type: "GUTS_UP",
    mesh: neoLandozerGutsUp(resources)
  }, {
    type: "GUTS_DOWN",
    mesh: neoLandozerGutsDown(resources)
  }, {
    type: "BACK_STEP",
    mesh: neoLandozerBackStep(resources)
  }, {
    type: "FRONT_STEP",
    mesh: neoLandozerFrontStep(resources)
  }];
}