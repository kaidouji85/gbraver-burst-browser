import * as THREE from "three";

import { toSilhouette } from "../../../../canvas/to-silhouette";
import { ResourcesContainer } from "../../../../resource";
import { TextureId } from "../../../../resource/texture/resource";
import { CanvasDisposeTexture } from "../../../../texture/canvas-dispose-texture";
import { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createHorizontalAnimation } from "../../mesh/horizontal-animation";
import { MESH_HEIGHT, MESH_WIDTH } from "./mesh-size";
import { MESH_Y } from "./position";

/** アクティブレイヤー Red */
const ACTIVE_COLOR_R = 128;
/** アクティブレイヤー Green */
const ACTIVE_COLOR_G = 128;
/** アクティブレイヤー Blue */
const ACTIVE_COLOR_B = 128;

/**
 * アクティブ用にシルエット化したテクスチャを生成する
 * @param texture 加工前のテクスチャ
 * @return シルエット化したテクスチャ
 */
function createActiveSilhouetteTexture(texture: THREE.Texture): THREE.Texture {
  const canvas = toSilhouette({
    image: texture.image,
    r: ACTIVE_COLOR_R,
    g: ACTIVE_COLOR_G,
    b: ACTIVE_COLOR_B,
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
 * ジェネシスブレイバーのアクティブメッシュを生成する
 * @param params パラメータ
 * @return 生成結果
 */
export function createGenesisBraverActiveMesh(
  params: Params,
): ArmdozerAnimation {
  const { resources, textureId, maxAnimation } = params;
  const texture =
    resources.textures.find((v) => v.id === textureId)?.texture ??
    new THREE.Texture();
  const silhouetteTexture = createActiveSilhouetteTexture(texture);
  const ret = createHorizontalAnimation({
    texture: silhouetteTexture,
    maxAnimation,
    width: MESH_WIDTH,
    height: MESH_HEIGHT,
  });
  const object = ret.getObject3D();
  object.position.y = MESH_Y;
  object.position.z = 0.01;
  return ret;
}
