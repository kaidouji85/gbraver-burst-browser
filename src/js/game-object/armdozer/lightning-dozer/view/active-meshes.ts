import type { Resources } from "../../../../resource";
import { lightningDozerActiveBackStep } from "../mesh/back-step";
import { lightningDozerActiveDown } from "../mesh/down";
import { lightningDozerActiveFrontStep } from "../mesh/front-step";
import { lightningDozerActiveGuard } from "../mesh/guard";
import { lightningDozerActiveGutsToStand } from "../mesh/gut-to-stand";
import { lightningDozerActiveGutsDown } from "../mesh/guts-down";
import { lightningDozerActiveGutsUp } from "../mesh/guts-up";
import { lightningDozerActiveHmAttack } from "../mesh/hm-attack";
import { lightningDozerActiveHmCharge } from "../mesh/hm-charge";
import { lightningDozerActiveHmToStand } from "../mesh/hm-to-stand";
import { lightningDozerActiveKnockBack } from "../mesh/knock-back";
import { lightningDozerActiveStand } from "../mesh/stand";
import type { AnimationMeshMapping } from "./animation-mesh-mapping";

/**
 * アクティブアニメーションメッシュマッピングを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createActiveMeshes(
  resources: Resources,
): AnimationMeshMapping[] {
  return [
    {
      type: "HM_CHARGE",
      mesh: lightningDozerActiveHmCharge(resources),
    },
    {
      type: "HM_ATTACK",
      mesh: lightningDozerActiveHmAttack(resources),
    },
    {
      type: "HM_TO_STAND",
      mesh: lightningDozerActiveHmToStand(resources),
    },
    {
      type: "KNOCK_BACK",
      mesh: lightningDozerActiveKnockBack(resources),
    },
    {
      type: "DOWN",
      mesh: lightningDozerActiveDown(resources),
    },
    {
      type: "GUTS_UP",
      mesh: lightningDozerActiveGutsUp(resources),
    },
    {
      type: "GUTS_DOWN",
      mesh: lightningDozerActiveGutsDown(resources),
    },
    {
      type: "GUTS_TO_STAND",
      mesh: lightningDozerActiveGutsToStand(resources),
    },
    {
      type: "GUARD",
      mesh: lightningDozerActiveGuard(resources),
    },
    {
      type: "BACK_STEP",
      mesh: lightningDozerActiveBackStep(resources),
    },
    {
      type: "FRONT_STEP",
      mesh: lightningDozerActiveFrontStep(resources),
    },
    {
      type: "STAND",
      mesh: lightningDozerActiveStand(resources),
    },
  ];
}
