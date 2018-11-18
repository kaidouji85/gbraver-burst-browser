// @flow

import type {ArmdozerMesh} from "../../common/armdozer-mesh";
import type {Resources} from "../../../../resource/index";
import {TEXTURE_IDS} from "../../../../resource/texture";
import {HorizontalAnimationMesh} from "../../common/horizontal-animation-mesh";

export const MAX_ANIMATION = 8;
export const MESH_WIDTH = 360;
export const MESH_HEIGHT = 360;

/** ネオラインドーザダメージポーズ */
export function neoLandozerKnockBack(resources: Resources): ArmdozerMesh {
  const ret = new HorizontalAnimationMesh({
    id: TEXTURE_IDS.NEO_LANDOZER_KNOCK_BACK,
    maxAnimation: MAX_ANIMATION,
    resources: resources,
    width: MESH_WIDTH,
    height: MESH_HEIGHT
  });
  ret.mesh.position.y = 130;
  return ret;
}
