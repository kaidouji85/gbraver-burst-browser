import * as THREE from "three";

import { Resources } from "../../../../resource";
import { TextureId } from "../../../../resource/texture/resource";
import { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createHorizontalAnimation } from "../../mesh/horizontal-animation";

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
 * シンブレイバーメッシュを生成する
 * @param params パラメータ
 * @return 生成結果
 */
export function createShinBraverMesh(params: Params): ArmdozerAnimation {
  const { resources, textureId, maxAnimation, width, height, positionY } =
    params;
  const texture =
    resources.textures.find((v) => v.id === textureId)?.texture ??
    new THREE.Texture();
  const ret = createHorizontalAnimation({
    texture,
    maxAnimation,
    width,
    height,
  });
  const object = ret.getObject3D();
  object.position.y = positionY;
  return ret;
}
