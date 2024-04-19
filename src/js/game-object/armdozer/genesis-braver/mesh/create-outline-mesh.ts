import * as THREE from "three";

import { toSilhouette } from "../../../../canvas/to-silhouette";
import { ResourcesContainer } from "../../../../resource";
import { TextureId } from "../../../../resource/texture/resource";
import { CanvasDisposeTexture } from "../../../../texture/canvas-dispose-texture";
import { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createHorizontalAnimation } from "../../mesh/horizontal-animation";
import { MESH_HEIGHT, MESH_WIDTH } from "./mesh-size";
import { OUTLINE_WIDTH } from "./outline-width";
import { MESH_Y } from "./position";

/** アウトラインレイヤー Red */
const OUTLINE_COLOR_R = 255;
/** アウトラインレイヤー Green */
const OUTLINE_COLOR_G = 0;
/** アウトラインレイヤー Blue */
const OUTLINE_COLOR_B = 128;

/**
 * アウトライン用にシルエット化したテクスチャを生成する
 * @param texture 加工前のテクスチャ
 * @return シルエット化したテクスチャ
 */
function createOutlineSilhouetteTexture(texture: THREE.Texture): THREE.Texture {
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
type Params = ResourcesContainer & {
  /** テクスチャID */
  textureId: TextureId;
  /** 最大アニメーション枚数 */
  maxAnimation: number;
};

/**
 * アウトラインメッシュを生成する
 * @param params パラメータ
 * @return 生成結果
 */
export function createOutlineMesh(params: Params): ArmdozerAnimation {
  const { resources, textureId, maxAnimation } = params;
  const texture =
    resources.textures.find((v) => v.id === textureId)?.texture ??
    new THREE.Texture();
  const silhouetteTexture = createOutlineSilhouetteTexture(texture);
  const ret = createHorizontalAnimation({
    texture: silhouetteTexture,
    maxAnimation,
    width: MESH_WIDTH + OUTLINE_WIDTH,
    height: MESH_HEIGHT + OUTLINE_WIDTH,
    blending: THREE.AdditiveBlending,
  });
  const object = ret.getObject3D();
  object.position.y = MESH_Y;
  object.position.z = -0.01;
  return ret;
}
