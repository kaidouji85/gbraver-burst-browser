// @flow

import type {ArmdozerAnimation} from "../../mesh/armdozer-animation";
import type {Resources} from "../../../../resource";
import {TEXTURE_IDS} from "../../../../resource/texture";
import {HorizontalArmdozerAnimation} from "../../mesh/horizontal-animation";

export const MAX_ANIMATION = 4;
export const MESH_WIDTH = 600;
export const MESH_HEIGHT = 600;

/** ネオラインドーザ アームハンマー攻撃 */
export function neoLandozerHMAttack(resources: Resources): ArmdozerAnimation {
  const ret = new HorizontalArmdozerAnimation({
    id: TEXTURE_IDS.NEO_LANDOZER_HM_ATTACK,
    maxAnimation: MAX_ANIMATION,
    resources: resources,
    width: MESH_WIDTH,
    height: MESH_HEIGHT
  });
  const object = ret.getObject3D();
  object.position.y = 135;
  object.position.z = 1;
  return ret;
}
