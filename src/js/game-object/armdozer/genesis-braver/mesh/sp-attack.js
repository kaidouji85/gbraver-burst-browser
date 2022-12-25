// @flow

import * as THREE from "three";

import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createHorizontalAnimation } from "../../mesh/horizontal-animation";
import { MESH_Y } from "./position";

/** スプライト幅 */
export const WIDTH = 600;
/** スプライト高 */
export const HEIGHT = 600;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * ジェネシスブレイバー アタック スプライトを生成
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function genesisBraverSPAttack(resources: Resources): ArmdozerAnimation {
  const texture =
    resources.textures.find(
      (v) => v.id === TEXTURE_IDS.GENESIS_BRAVER_SP_ATTACK
    )?.texture ?? new THREE.Texture();
  const mesh = createHorizontalAnimation({
    texture,
    maxAnimation: MAX_ANIMATION,
    width: WIDTH,
    height: HEIGHT,
  });
  mesh.getObject3D().position.y = MESH_Y;
  return mesh;
}
