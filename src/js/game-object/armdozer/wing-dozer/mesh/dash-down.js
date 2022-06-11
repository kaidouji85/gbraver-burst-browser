// @flow

import type {Resources} from "../../../../resource";
import {TEXTURE_IDS} from "../../../../resource/texture";
import type {ArmdozerAnimation} from "../../mesh/armdozer-animation";
import {HorizontalArmdozerAnimation} from "../../mesh/horizontal-animation";
import {MESH_HEIGHT, MESH_WIDTH} from './mesh-size';
import {MESH_Y} from "./position";

export const MAX_ANIMATION = 4;

/**
 * ウィングドーザ ダッシュ ダウン
 *
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function wingDozerDashDown(resources: Resources): ArmdozerAnimation {
  const ret = new HorizontalArmdozerAnimation({
    id: TEXTURE_IDS.WING_DOZER_DASH_DOWN,
    maxAnimation: MAX_ANIMATION,
    resources: resources,
    width: MESH_WIDTH,
    height: MESH_HEIGHT
  });
  const object = ret.getObject3D();
  object.position.y = MESH_Y;
  return ret;
}