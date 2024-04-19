import { ResourcesContainer } from "../../../../resource";
import { TextureId } from "../../../../resource/texture/resource";
import { AnimationType } from "../model/animation-type";
import { AnimationMesh } from "./animation-mesh";
import { createOutlineMesh } from "./create-outline-mesh";
import { createStandardMesh } from "./create-standard-mesh";

/** パラメータ */
type Params = ResourcesContainer & {
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
export function createAnimationMeshes(params: Params): AnimationMesh[] {
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
