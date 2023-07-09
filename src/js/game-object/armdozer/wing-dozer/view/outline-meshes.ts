import { Resources } from "../../../../resource";
import { wingDozerOutlineBackStep } from "../mesh/back-step";
import { wingDozerOutlineDashDown } from "../mesh/dash-down";
import { wingDozerOutlineDashToStand } from "../mesh/dash-to-stand";
import { wingDozerOutlineDashUp } from "../mesh/dash-up";
import { wingDozerOutlineDown } from "../mesh/down";
import { wingDozerOutlineFrontStep } from "../mesh/front-step";
import { wingDozerOutlineGuard } from "../mesh/guard";
import { wingDozerOutlineKnockBack } from "../mesh/knock-back";
import { wingDozerOutlineStand } from "../mesh/stand";
import { wingDozerOutlineUpperAttack } from "../mesh/upper-attack";
import { wingDozerOutlineUpperCharge } from "../mesh/upper-charge";
import { wingDozerOutlineUpperToStand } from "../mesh/upper-to-stand";
import { AnimationMeshMapping } from "./animation-mesh-mapping";

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
      type: "STAND",
      mesh: wingDozerOutlineStand(resources),
    },
    {
      type: "UPPER_CHARGE",
      mesh: wingDozerOutlineUpperCharge(resources),
    },
    {
      type: "UPPER_ATTACK",
      mesh: wingDozerOutlineUpperAttack(resources),
    },
    {
      type: "UPPER_TO_STAND",
      mesh: wingDozerOutlineUpperToStand(resources),
    },
    {
      type: "DASH_UP",
      mesh: wingDozerOutlineDashUp(resources),
    },
    {
      type: "DASH_DOWN",
      mesh: wingDozerOutlineDashDown(resources),
    },
    {
      type: "DASH_TO_STAND",
      mesh: wingDozerOutlineDashToStand(resources),
    },
    {
      type: "KNOCK_BACK",
      mesh: wingDozerOutlineKnockBack(resources),
    },
    {
      type: "DOWN",
      mesh: wingDozerOutlineDown(resources),
    },
    {
      type: "BACK_STEP",
      mesh: wingDozerOutlineBackStep(resources),
    },
    {
      type: "FRONT_STEP",
      mesh: wingDozerOutlineFrontStep(resources),
    },
    {
      type: "GUARD",
      mesh: wingDozerOutlineGuard(resources),
    },
  ];
}
