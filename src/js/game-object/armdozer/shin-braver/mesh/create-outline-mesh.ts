import * as THREE from "three";

import { Resources } from "../../../../resource";
import { TextureId } from "../../../../resource/texture/resource";
import { createHorizontalAnimation } from "../../mesh/horizontal-animation";
import { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { toSilhouette } from "../../../../canvas/to-silhouette";
import { CanvasDisposeTexture } from "../../../../texture/canvas-dispose-texture";

/** アウトラインレイヤー Red */
const OUTLINE_COLOR_R = 255;
/** アウトラインレイヤー Green */
const OUTLINE_COLOR_G = 0;
/** アウトラインレイヤー Blue */
const OUTLINE_COLOR_B = 255;

/**
 * アウトライン用にシルエット化したテクスチャを生成する
 * @param texture 加工前のテクスチャ
 * @return シルエット化したテクスチャ
 */
function createOutlineSilhouetteTexture(
  texture: THREE.Texture
): THREE.Texture {
  const canvas = toSilhouette({
    image: texture.image,
    r: OUTLINE_COLOR_R,
    g: OUTLINE_COLOR_G,
    b: OUTLINE_COLOR_B,
    scale: 0.5,
  });
  return new CanvasDisposeTexture(canvas);
}

/** パラメータ */
type Params = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** テクスチャID */
  textureId: TextureId;
  /** 最大アニメーション枚数 */
  maxAnimation: number;
  /** メッシュ幅 */
  width: number;
  /** メッシュ高 */
  height: number;
  /** ローカル座標Y軸 */
  positionY: number;
  /** アウトラインの太さ */
  outlineWidth: number;
};

/**
 * シンブレイバーのアウトラインメッシュを生成する
 * @param params パラメータ
 * @return　生成結果
 */
export function createShinBraverMesh(params: Params): ArmdozerAnimation {
  const { resources, textureId, maxAnimation, width, height, positionY, outlineWidth } = params;
  const texture =
    resources.textures.find((v) => v.id === textureId)
      ?.texture ?? new THREE.Texture();
  const silhouetteTexture = createOutlineSilhouetteTexture(texture);
  const ret = createHorizontalAnimation({
    texture: silhouetteTexture,
    maxAnimation,
    width : width + outlineWidth,
    height: height + outlineWidth,
    blending: THREE.AdditiveBlending,
  });
  const object = ret.getObject3D();
  object.position.y = positionY;
  object.position.z = -0.01;
  return ret;
}