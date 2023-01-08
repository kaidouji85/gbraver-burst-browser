import type { Resources } from "../../../../resource";
import { lightningDozerBackStep } from "../mesh/back-step";
import { lightningDozerDown } from "../mesh/down";
import { lightningDozerFrontStep } from "../mesh/front-step";
import { lightningDozerGuard } from "../mesh/guard";
import { lightningDozerGutsToStand } from "../mesh/gut-to-stand";
import { lightningDozerGutsDown } from "../mesh/guts-down";
import { lightningDozerGutsUp } from "../mesh/guts-up";
import { lightningDozerHmAttack } from "../mesh/hm-attack";
import { lightningDozerHmCharge } from "../mesh/hm-charge";
import { lightningDozerHmToStand } from "../mesh/hm-to-stand";
import { lightningDozerKnockBack } from "../mesh/knock-back";
import { lightningDozerStand } from "../mesh/stand";
import type { AnimationMeshMapping } from "./animation-mesh-mapping";

/**
 * アニメーションメッシュマッピングを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createMeshes(resources: Resources): AnimationMeshMapping[] {
  return [
    {
      type: "HM_CHARGE",
      mesh: lightningDozerHmCharge(resources),
    },
    {
      type: "HM_ATTACK",
      mesh: lightningDozerHmAttack(resources),
    },
    {
      type: "HM_TO_STAND",
      mesh: lightningDozerHmToStand(resources),
    },
    {
      type: "KNOCK_BACK",
      mesh: lightningDozerKnockBack(resources),
    },
    {
      type: "DOWN",
      mesh: lightningDozerDown(resources),
    },
    {
      type: "GUTS_UP",
      mesh: lightningDozerGutsUp(resources),
    },
    {
      type: "GUTS_DOWN",
      mesh: lightningDozerGutsDown(resources),
    },
    {
      type: "GUTS_TO_STAND",
      mesh: lightningDozerGutsToStand(resources),
    },
    {
      type: "GUARD",
      mesh: lightningDozerGuard(resources),
    },
    {
      type: "BACK_STEP",
      mesh: lightningDozerBackStep(resources),
    },
    {
      type: "FRONT_STEP",
      mesh: lightningDozerFrontStep(resources),
    },
    {
      type: "STAND",
      mesh: lightningDozerStand(resources),
    },
  ];
}
