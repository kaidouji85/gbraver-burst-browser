// @flow

import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createHorizontalAnimationFromResources } from "../../mesh/horizontal-animation";
import { MESH_HEIGHT, MESH_WIDTH } from "./mesh-size";
import { MESH_Y } from "./position";

export const MAX_ANIMATION = 8;

/**
 * ウィングドーザ アッパー -> 立ち
 *
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function wingDozerUpperToStand(resources: Resources): ArmdozerAnimation {
  const ret = createHorizontalAnimationFromResources({
    id: TEXTURE_IDS.WING_DOZER_UPPER_TO_STAND,
    maxAnimation: MAX_ANIMATION,
    resources: resources,
    width: MESH_WIDTH,
    height: MESH_HEIGHT,
  });
  const object = ret.getObject3D();
  object.position.y = MESH_Y;
  object.position.z = 1;
  return ret;
}
