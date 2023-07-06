import { Resources } from "../../../../resource";
import { wingDozerOutlineDashDown } from "../mesh/dash-down";
import { wingDozerOutlineDashToStand } from "../mesh/dash-to-stand";
import { wingDozerOutlineDashUp } from "../mesh/dash-up";
import { wingDozerOutlineFrontStep } from "../mesh/front-step";
import { wingDozerOutlineGuard } from "../mesh/guard";
import { wingDozerOutlineKnockBack } from "../mesh/knock-back";
import { wingDozerOutlineStand } from "../mesh/stand";
import { AnimationMeshMapping } from "./animation-mesh-mapping";

/**
 * アウトラインアニメーションメッシュマッピングを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createOutlineMeshes(
  resources: Resources
): AnimationMeshMapping[] {
  return [
    {
      type: "STAND",
      mesh: wingDozerOutlineStand(resources)
    },
    {
      type: "DASH_UP",
      mesh: wingDozerOutlineDashUp(resources)
    },
    {
      type: "DASH_DOWN",
      mesh: wingDozerOutlineDashDown(resources)
    },
    {
      type: "DASH_TO_STAND",
      mesh: wingDozerOutlineDashToStand(resources)
    },
    {
      type: "FRONT_STEP",
      mesh: wingDozerOutlineFrontStep(resources),
    },
    {
      type: "GUARD",
      mesh: wingDozerOutlineGuard(resources),
    },
    {
      type: "KNOCK_BACK",
      mesh: wingDozerOutlineKnockBack(resources),
    }
  ];
}