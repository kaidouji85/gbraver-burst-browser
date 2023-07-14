import { Resources } from "../../../../resource";
import { TextureId } from "../../../../resource/texture/resource";
import { AnimationType } from "../model/lightning-dozer-model";
import { AnimationMeshMapping } from "./animation-mesh-mapping";
import { createOutlineMesh } from "./create-outline-mesh";
import { createStandardMesh } from "./create-standard-mesh";

/** パラメータ */
type Params = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** アニメーションタイプ */
  animationType: AnimationType;
  /** テクスチャID */
  textureId: TextureId;
  /** アニメーション枚数 */
  maxAnimation: number;
};

/**
 * アニメーション対応に対応したメッシュ群を生成する
 * @param params パラメータ
 * @return 生成結果
 */
export function createMeshesForAnimation(
  params: Params,
): AnimationMeshMapping[] {
  const { animationType } = params;
  return [
    {
      animationType,
      meshType: "STANDARD",
      mesh: createStandardMesh(params),
    },
    {
      animationType,
      meshType: "OUTLINE",
      mesh: createOutlineMesh(params),
    },
  ];
}
