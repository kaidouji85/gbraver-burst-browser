import { Resources } from "../../../../resource";
import { lightningDozerOutlineFrontStep } from "../mesh/front-step";
import { lightningDozerOutlineGuard } from "../mesh/guard";
import { lightningDozerOutlineGutsToStand } from "../mesh/gut-to-stand";
import { lightningDozerOutlineGutsDown } from "../mesh/guts-down";
import { lightningDozerOutlineGutsUp } from "../mesh/guts-up";
import { lightningDozerOutlineKnockBack } from "../mesh/knock-back";
import { lightningDozerOutlineStand } from "../mesh/stand";
import { AnimationMeshMapping } from "./animation-mesh-mapping";
import {lightningDozerOutlineHmCharge} from "../mesh/hm-charge";
import {lightningDozerOutlineHmAttack} from "../mesh/hm-attack";
import {lightningDozerOutlineHmToStand} from "../mesh/hm-to-stand";
import {lightningDozerOutlineDown} from "../mesh/down";
import {lightningDozerOutlineBackStep} from "../mesh/back-step";

/**
 * アウトラインアニメーションメッシュマッピングを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createOutlineMeshes(
  resources: Resources,
): AnimationMeshMapping[] {
  return [
    {
      type: "HM_CHARGE",
      mesh: lightningDozerOutlineHmCharge(resources),
    },
    {
      type: "HM_ATTACK",
      mesh: lightningDozerOutlineHmAttack(resources),
    },
    {
      type: "HM_TO_STAND",
      mesh: lightningDozerOutlineHmToStand(resources),
    },
    {
      type: "KNOCK_BACK",
      mesh: lightningDozerOutlineKnockBack(resources),
    },
    {
      type: "DOWN",
      mesh: lightningDozerOutlineDown(resources),
    },
    {
      type: "GUTS_UP",
      mesh: lightningDozerOutlineGutsUp(resources),
    },
    {
      type: "GUTS_DOWN",
      mesh: lightningDozerOutlineGutsDown(resources),
    },
    {
      type: "GUTS_TO_STAND",
      mesh: lightningDozerOutlineGutsToStand(resources),
    },
    {
      type: "GUARD",
      mesh: lightningDozerOutlineGuard(resources),
    },
    {
      type: "BACK_STEP",
      mesh: lightningDozerOutlineBackStep(resources),
    },
    {
      type: "FRONT_STEP",
      mesh: lightningDozerOutlineFrontStep(resources),
    },
    {
      type: "STAND",
      mesh: lightningDozerOutlineStand(resources),
    },
  ];
}
