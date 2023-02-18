import * as THREE from "three";

import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createHorizontalAnimation } from "../../mesh/horizontal-animation";
import { MESH_Y } from "./position";
import {toSilhouette} from "../../../../canvas/silhouette/to-silhouette";
import {ACTIVE_COLOR_B, ACTIVE_COLOR_G, ACTIVE_COLOR_R} from "./active-color";

/** スプライト幅 */
export const WIDTH = 600;

/** スプライト高 */
export const HEIGHT = 600;

/** アニメーション枚数 */
export const MAX_ANIMATION = 1;

/**
 * ジェネシスブレイバー 立ち メッシュを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function genesisBraverStand(resources: Resources): ArmdozerAnimation {
  const texture =
    resources.textures.find((v) => v.id === TEXTURE_IDS.GENESIS_BRAVER_STAND)
      ?.texture ?? new THREE.Texture();
  const mesh = createHorizontalAnimation({
    texture,
    maxAnimation: MAX_ANIMATION,
    width: WIDTH,
    height: HEIGHT,
  });
  mesh.getObject3D().position.y = MESH_Y;
  return mesh;
}

/**
 * ジェネシスブレイバー アクティブ立ち メッシュを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function genesisBraverActiveStand(resources: Resources): ArmdozerAnimation {
  const texture =
    resources.textures.find((v) => v.id === TEXTURE_IDS.GENESIS_BRAVER_STAND)
      ?.texture ?? new THREE.Texture();
  const canvas = toSilhouette(
    texture.image,
    ACTIVE_COLOR_R,
    ACTIVE_COLOR_G,
    ACTIVE_COLOR_B
  );
  const silhouetteTexture = new THREE.Texture(canvas);
  const mesh = createHorizontalAnimation({
    texture: silhouetteTexture,
    maxAnimation: MAX_ANIMATION,
    width: WIDTH,
    height: HEIGHT,
  });
  mesh.getObject3D().position.y = MESH_Y;
  return mesh;
}