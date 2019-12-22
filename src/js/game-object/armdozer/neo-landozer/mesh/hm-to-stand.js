// @flow

import type {ArmdozerAnimation} from "../../mesh/armdozer-animation";
import type {Resources} from "../../../../resource";
import {TEXTURE_IDS} from "../../../../resource/texture";
import {HorizontalArmdozerAnimation} from "../../mesh/horizontal-animation";
import {MESH_Y} from "./position";

export const MAX_ANIMATION = 4;
export const MESH_WIDTH = 600;
export const MESH_HEIGHT = 600;

/** ネオラインドーザ アームハンマー -> 立ち */
export function neoLandozerHMToStand(resources: Resources): ArmdozerAnimation {
  const ret = new HorizontalArmdozerAnimation({
    id: TEXTURE_IDS.NEO_LANDOZER_HM_TO_STAND,
    maxAnimation: MAX_ANIMATION,
    resources: resources,
    width: MESH_WIDTH,
    height: MESH_HEIGHT
  });
  const object = ret.getObject3D();
  object.position.y = MESH_Y;
  object.position.z = 1;
  return ret;
}
