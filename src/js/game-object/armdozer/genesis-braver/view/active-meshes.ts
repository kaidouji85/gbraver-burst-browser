import {Resources} from "../../../../resource";
import {AnimationMeshMapping} from "./animation-mesh-mapping";
import {genesisBraverActiveStand} from "../mesh/stand";

/**
 * アニメーションアクティブメッシュマッピング生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createActiveMeshes(resources: Resources): AnimationMeshMapping[] {
  return [
    {
      type: "STAND",
      mesh: genesisBraverActiveStand(resources),
    }
  ];
}