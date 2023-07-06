import { Resources } from "../../../../resource";
import { lightningDozerOutlineStand } from "../mesh/stand";
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
      mesh: lightningDozerOutlineStand(resources)
    }
  ];
}