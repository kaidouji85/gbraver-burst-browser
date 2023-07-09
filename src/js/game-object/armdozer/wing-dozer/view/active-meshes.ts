import type { Resources } from "../../../../resource";
import { wingDozerActiveDashDown } from "../mesh/dash-down";
import { wingDozerActiveDashToStand } from "../mesh/dash-to-stand";
import { wingDozerActiveDashUp } from "../mesh/dash-up";
import { wingDozerActiveFrontStep } from "../mesh/front-step";
import { wingDozerActiveGuard } from "../mesh/guard";
import { wingDozerActiveKnockBack } from "../mesh/knock-back";
import { wingDozerActiveStand } from "../mesh/stand";
import type { AnimationMeshMapping } from "./animation-mesh-mapping";
import {wingDozerActiveUpperCharge} from "../mesh/upper-charge";
import {wingDozerActiveUpperAttack} from "../mesh/upper-attack";
import {wingDozerActiveUpperToStand} from "../mesh/upper-to-stand";
import {wingDozerActiveDown} from "../mesh/down";
import {wingDozerActiveBackStep} from "../mesh/back-step";

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
      type: "STAND",
      mesh: wingDozerActiveStand(resources),
    },
    {
      type: "UPPER_CHARGE",
      mesh: wingDozerActiveUpperCharge(resources),
    },
    {
      type: "UPPER_ATTACK",
      mesh: wingDozerActiveUpperAttack(resources),
    },
    {
      type: "UPPER_TO_STAND",
      mesh: wingDozerActiveUpperToStand(resources),
    },
    {
      type: "DASH_UP",
      mesh: wingDozerActiveDashUp(resources),
    },
    {
      type: "DASH_DOWN",
      mesh: wingDozerActiveDashDown(resources),
    },
    {
      type: "DASH_TO_STAND",
      mesh: wingDozerActiveDashToStand(resources),
    },
    {
      type: "KNOCK_BACK",
      mesh: wingDozerActiveKnockBack(resources),
    },
    {
      type: "DOWN",
      mesh: wingDozerActiveDown(resources),
    },
    {
      type: "BACK_STEP",
      mesh: wingDozerActiveBackStep(resources),
    },
    {
      type: "FRONT_STEP",
      mesh: wingDozerActiveFrontStep(resources),
    },
    {
      type: "GUARD",
      mesh: wingDozerActiveGuard(resources),
    },
  ];
}
