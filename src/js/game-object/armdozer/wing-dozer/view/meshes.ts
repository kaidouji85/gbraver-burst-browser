import type { Resources } from "../../../../resource";
import { wingDozerBackStep } from "../mesh/back-step";
import { wingDozerDashDown } from "../mesh/dash-down";
import { wingDozerDashToStand } from "../mesh/dash-to-stand";
import { wingDozerDashUp } from "../mesh/dash-up";
import { wingDozerDown } from "../mesh/down";
import { wingDozerFrontStep } from "../mesh/front-step";
import { wingDozerGuard } from "../mesh/guard";
import { wingDozerKnockBack } from "../mesh/knock-back";
import { wingDozerStand } from "../mesh/stand";
import { wingDozerUpperAttack } from "../mesh/upper-attack";
import { wingDozerUpperCharge } from "../mesh/upper-charge";
import { wingDozerUpperToStand } from "../mesh/upper-to-stand";
import type { AnimationMeshMapping } from "./animation-mesh-mapping";

/**
 * アニメーションメッシュマッピングを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createMeshes(resources: Resources): AnimationMeshMapping[] {
  return [{
    type: "STAND",
    mesh: wingDozerStand(resources)
  }, {
    type: "UPPER_CHARGE",
    mesh: wingDozerUpperCharge(resources)
  }, {
    type: "UPPER_ATTACK",
    mesh: wingDozerUpperAttack(resources)
  }, {
    type: "UPPER_TO_STAND",
    mesh: wingDozerUpperToStand(resources)
  }, {
    type: "DASH_UP",
    mesh: wingDozerDashUp(resources)
  }, {
    type: "DASH_DOWN",
    mesh: wingDozerDashDown(resources)
  }, {
    type: "DASH_TO_STAND",
    mesh: wingDozerDashToStand(resources)
  }, {
    type: "KNOCK_BACK",
    mesh: wingDozerKnockBack(resources)
  }, {
    type: "DOWN",
    mesh: wingDozerDown(resources)
  }, {
    type: "BACK_STEP",
    mesh: wingDozerBackStep(resources)
  }, {
    type: "FRONT_STEP",
    mesh: wingDozerFrontStep(resources)
  }, {
    type: "GUARD",
    mesh: wingDozerGuard(resources)
  }];
}