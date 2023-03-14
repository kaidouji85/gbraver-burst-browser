import * as THREE from "three";

import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createHorizontalAnimation } from "../../mesh/horizontal-animation";
import { createSilhouetteTexture } from "./create-silhouette-texture";
import { MESH_Y } from "./position";

/** スプライト幅 */
export const WIDTH = 600;

/** スプライト高 */
export const HEIGHT = 600;

/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/** テクスチャID */
const MESH_TEXTURE = TEXTURE_IDS.GENESIS_BRAVER_GUARD;

/**
 * ジェネシスブレイバー ノックバック ガードを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function genesisBraverGuard(
  resources: Resources
): ArmdozerAnimation {
  const texture =
    resources.textures.find(
      (v) => v.id === MESH_TEXTURE
    )?.texture ?? new THREE.Texture();
  const mesh = createHorizontalAnimation({
    texture,
    maxAnimation: MAX_ANIMATION,
    width: WIDTH,
    height: HEIGHT,
  });
  mesh.getObject3D().position.y = MESH_Y;
  mesh.getObject3D().position.z = 1;
  return mesh;
}

/**
 * ジェネシスブレイバー アクティブ ガード スプライトを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function genesisBraverActiveGuard(
  resources: Resources
): ArmdozerAnimation {
  const texture =
    resources.textures.find(
      (v) => v.id === MESH_TEXTURE
    )?.texture ?? new THREE.Texture();
  const silhouetteTexture = createSilhouetteTexture(texture);
  const mesh = createHorizontalAnimation({
    texture: silhouetteTexture,
    maxAnimation: MAX_ANIMATION,
    width: WIDTH,
    height: HEIGHT,
  });
  mesh.getObject3D().position.y = MESH_Y;
  mesh.getObject3D().position.z = 1;
  return mesh;
}
