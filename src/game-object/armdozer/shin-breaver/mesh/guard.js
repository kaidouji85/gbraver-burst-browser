// @flow

import type {Resources} from "../../../../resource";
import type {SpriteAnimation} from "../../../../mesh/animation/sprite-animation";
import {HorizontalAnimationMesh} from "../../../../mesh/animation/horizontal-animation";
import {TEXTURE_IDS} from "../../../../resource/texture";

export const MESH_WIDTH = 600;
export const MESH_HEIGHT = 600;
export const MAX_ANIMATION = 4;

/** ガード */
export function shinBraverGuard(resources: Resources): SpriteAnimation {
  const ret = new HorizontalAnimationMesh({
    id: TEXTURE_IDS.SHIN_BRAVER_GUARD,
    maxAnimation: MAX_ANIMATION,
    resources: resources,
    width: MESH_WIDTH,
    height: MESH_HEIGHT
  });
  ret.mesh.position.y = 140;
  ret.mesh.position.z = 1;
  return ret;
}