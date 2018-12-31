// @flow

import type {Resources} from "../../../../resource";
import type {ArmdozerMesh} from "../../mesh/armdozer-mesh";
import {HorizontalAnimationMesh} from "../../mesh/horizontal-animation-mesh";
import {TEXTURE_IDS} from "../../../../resource/texture";

export const MESH_WIDTH = 512;
export const MESH_HEIGHT = 512;
export const MAX_ANIMATION = 8;

/** ストレートパンチ攻撃 */
export function shinBraverSPAttack(resources: Resources): ArmdozerMesh {
  const ret = new HorizontalAnimationMesh({
    id: TEXTURE_IDS.SHIN_BRAVER_SP_ATTACK,
    maxAnimation: MAX_ANIMATION,
    resources: resources,
    width: MESH_WIDTH,
    height: MESH_HEIGHT
  });
  ret.mesh.position.y = 140;
  return ret;
}