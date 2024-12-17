import { ResourcesContainer } from "../../../../resource";
import { TextureId } from "../../../../resource/texture/resource";
import { createOutlineMesh } from "../../mesh/create-outline-mesh";
import { createStandardMesh } from "../../mesh/create-standard-mesh";
import { AnimationType } from "../model/animation-type";
import { AnimationMesh } from "./animation-mesh";

/** メッシュ幅 */
const MESH_WIDTH = 600;

/** メッシュ高 */
const MESH_HEIGHT = 600;

/** オフセット座標 */
const OFFSET = {
  y: 160,
};

/** アウトラインの太さ */
const OUTLINE_WIDTH = 30;

/** アウトラインカラー */
const OUTLINE_COLOR = {
  r: 0,
  g: 255,
  b: 255,
};

/** オプション */
type Options = ResourcesContainer & {
  /** アニメーションタイプ */
  animationType: AnimationType;
  /** テクスチャID */
  textureId: TextureId;
  /** アニメーション枚数 */
  maxAnimation: number;
};

/**
 * アニメーション対応に対応したメッシュ群を生成する
 * @param options オプション
 * @returns 生成結果
 */
export function createAnimationMeshes(options: Options): AnimationMesh[] {
  const { animationType } = options;
  return [
    {
      animationType,
      meshType: "STANDARD",
      mesh: createStandardMesh({
        ...options,
        width: MESH_WIDTH,
        height: MESH_HEIGHT,
        offset: OFFSET,
      }),
    },
    {
      animationType,
      meshType: "OUTLINE",
      mesh: createOutlineMesh({
        ...options,
        width: MESH_WIDTH,
        height: MESH_HEIGHT,
        outlineWidth: OUTLINE_WIDTH,
        color: OUTLINE_COLOR,
        offset: OFFSET,
      }),
    },
  ];
}
