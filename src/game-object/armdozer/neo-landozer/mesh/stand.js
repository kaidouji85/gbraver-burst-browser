// @flow

import type {ArmdozerMesh} from "../../common/armdozer-mesh";
import type {Resources} from "../../../../resource/index";
import {TEXTURE_IDS} from "../../../../resource/texture";
import {HorizontalAnimationMesh} from "../../common/horizontal-animation-mesh";

export const MAX_ANIMATION = 1;
export const MESH_WIDTH = 320;
export const MESH_HEIGHT = 320;

/** ネオラインドーザ立ちポーズ */
export function neoLandozerStand(resources: Resources): ArmdozerMesh {
  const ret = new HorizontalAnimationMesh({
    id: TEXTURE_IDS.NEO_LANDOZER_STAND,
    maxAnimation: MAX_ANIMATION,
    resources: resources,
    width: MESH_WIDTH,
    height: MESH_HEIGHT
  });
  ret.mesh.position.y = 150;
  return ret;
}
