// @flow

import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createHorizontalAnimationFromResources } from "../../mesh/horizontal-animation";
import { MESH_Y } from "./position";

export const MAX_ANIMATION = 4;
export const MESH_WIDTH = 600;
export const MESH_HEIGHT = 600;

/**
 * ネオランドーザ バックステップ
 *
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function neoLandozerBackStep(resources: Resources): ArmdozerAnimation {
  const ret = createHorizontalAnimationFromResources({
    id: TEXTURE_IDS.NEO_LANDOZER_BACK_STEP,
    maxAnimation: MAX_ANIMATION,
    resources: resources,
    width: MESH_WIDTH,
    height: MESH_HEIGHT,
  });
  const object = ret.getObject3D();
  object.position.y = MESH_Y;
  return ret;
}
