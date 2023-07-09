import { Resources } from "../../../../resource";
import { AnimationMeshMapping } from "./animation-mesh-mapping";
import {genesisBraverOutlineKnockBack} from "../mesh/knock-back";
import {genesisBraverOutlineStand} from "../mesh/stand";
import {genesisBraverOutlineGuard} from "../mesh/guard";
import {genesisBraverOutlineFrontStep} from "../mesh/front-step";
import {genesisBraverOutlineBurstUp} from "../mesh/burst-up";

/**
 * アニメーションアクティブメッシュマッピング生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createOutlineMeshes(
  resources: Resources,
): AnimationMeshMapping[] {
  return [
    {
      type: "STAND",
      mesh: genesisBraverOutlineStand(resources),
    },
    {
      type: "KNOCK_BACK",
      mesh: genesisBraverOutlineKnockBack(resources)
    },
    {
      type: "GUARD",
      mesh: genesisBraverOutlineGuard(resources),
    },
    {
      type: "FRONT_STEP",
      mesh: genesisBraverOutlineFrontStep(resources),
    },
    {
      type: "BURST_UP",
      mesh: genesisBraverOutlineBurstUp(resources),
    }
  ];
}
