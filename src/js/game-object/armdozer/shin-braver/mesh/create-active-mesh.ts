import * as THREE from "three";

import { Resources } from "../../../../resource";
import { TextureId } from "../../../../resource/texture/resource";
import { createHorizontalAnimation } from "../../mesh/horizontal-animation";
import { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { toSilhouette } from "../../../../canvas/to-silhouette";
import { CanvasDisposeTexture } from "../../../../texture/canvas-dispose-texture";

/** アクティブレイヤー Red */
const ACTIVE_COLOR_R = 100;
/** アクティブレイヤー Green */
const ACTIVE_COLOR_G = 100;
/** アクティブレイヤー Blue */
const ACTIVE_COLOR_B = 100;

/**
 * アクティブ用にシルエット化したテクスチャを生成する
 * @param texture 加工前のテクスチャ
 * @return シルエット化したテクスチャ
 */
function createActiveSilhouetteTexture(
  texture: THREE.Texture
): THREE.Texture {
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
};

/**
 * シンブレイバーのアクティブメッシュを生成する
 * @param params パラメータ
 * @return　生成結果
 */
export function createShinBraverActiveMesh(params: Params): ArmdozerAnimation {
  const { resources, textureId, maxAnimation, width, height, positionY } = params;
  const texture =
    resources.textures.find((v) => v.id === textureId)
      ?.texture ?? new THREE.Texture();
  const silhouetteTexture = createActiveSilhouetteTexture(texture);
  const ret = createHorizontalAnimation({
    texture: silhouetteTexture,
    maxAnimation,
    width,
    height,
  });
  const object = ret.getObject3D();
  object.position.y = positionY;
  object.position.z = 0.01;
  return ret;
}