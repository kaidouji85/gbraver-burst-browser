import { Resources } from "../../../../resource";
import { granDozerCutInBurstDown } from "../mesh/burst-down";
import { granDozerCutInBurstUp } from "../mesh/burst-up";
import { AnimationMeshMapping } from "./animation-mesh-mapping";

/**
 * アニメーションメッシュマッピングを生成
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function createMeshes(resources: Resources): AnimationMeshMapping[] {
  return [
    {
      type: "BURST_UP",
      mesh: granDozerCutInBurstUp(resources),
    },
    {
      type: "BURST_DOWN",
      mesh: granDozerCutInBurstDown(resources),
    },
  ];
}
