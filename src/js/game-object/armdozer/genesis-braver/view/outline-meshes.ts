import { Resources } from "../../../../resource";
import { AnimationMeshMapping } from "./animation-mesh-mapping";
import {genesisBraverOutlineKnockBack} from "../mesh/knock-back";

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
      type: "KNOCK_BACK",
      mesh: genesisBraverOutlineKnockBack(resources)
    },
  ];
}
