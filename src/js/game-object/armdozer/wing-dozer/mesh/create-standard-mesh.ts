import * as THREE from "three";

import { ResourcesContainer } from "../../../../resource";
import { TextureId } from "../../../../resource/texture/resource";
import { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createHorizontalAnimation } from "../../mesh/horizontal-animation";
import { MESH_HEIGHT, MESH_WIDTH } from "./mesh-size";
import { MESH_Y } from "./position";

/** パラメータ */
type Params = ResourcesContainer & {
  /** テクスチャID */
  textureId: TextureId;
  /** 最大アニメーション枚数 */
  maxAnimation: number;
};

/**
 * 標準メッシュを生成する
 * @param params パラメータ
 * @return 生成結果
 */
export function createStandardMesh(params: Params): ArmdozerAnimation {
  const { resources, textureId, maxAnimation } = params;
  const texture =
    resources.textures.find((v) => v.id === textureId)?.texture ??
    new THREE.Texture();
  const ret = createHorizontalAnimation({
    texture,
    maxAnimation,
    width: MESH_WIDTH,
    height: MESH_HEIGHT,
  });
  const object = ret.getObject3D();
  object.position.y = MESH_Y;
  return ret;
}
