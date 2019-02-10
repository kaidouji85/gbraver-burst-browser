// @flow

import type {SpriteAnimation} from "../../../../mesh/animation/sprite-animation";
import type {Resources} from "../../../../resource/index";
import {TEXTURE_IDS} from "../../../../resource/texture";
import {HorizontalAnimationMesh} from "../../../../mesh/animation/horizontal-animation";

export const MAX_ANIMATION = 4;
export const MESH_WIDTH = 600;
export const MESH_HEIGHT = 600;

/** ネオラインドーザ アームハンマー攻撃 */
export function neoLandozerHMAttack(resources: Resources): SpriteAnimation {
  const ret = new HorizontalAnimationMesh({
    id: TEXTURE_IDS.NEO_LANDOZER_HM_ATTACK,
    maxAnimation: MAX_ANIMATION,
    resources: resources,
    width: MESH_WIDTH,
    height: MESH_HEIGHT
  });
  ret.mesh.position.y = 135;
  ret.mesh.position.z = 1;
  return ret;
}
