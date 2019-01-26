// @flow

import type {Resources} from "../../../../resource";
import type {ArmdozerMesh} from "../../mesh/armdozer-mesh";
import {HorizontalAnimationMesh} from "../../mesh/horizontal-animation-mesh";
import {TEXTURE_IDS} from "../../../../resource/texture";

export const MESH_WIDTH = 600;
export const MESH_HEIGHT = 600;
export const MAX_ANIMATION = 4;

/** ノックバック */
export function shinBraverKnockBack(resources: Resources): ArmdozerMesh {
  const ret = new HorizontalAnimationMesh({
    id: TEXTURE_IDS.SHIN_BRAVER_KNOCK_BACK,
    maxAnimation: MAX_ANIMATION,
    resources: resources,
    width: MESH_WIDTH,
    height: MESH_HEIGHT
  });
  ret.mesh.position.y = 140;
  ret.mesh.position.z = 1;
  return ret;
}