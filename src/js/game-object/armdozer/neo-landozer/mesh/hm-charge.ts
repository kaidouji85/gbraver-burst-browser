import * as THREE from "three";

import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createHorizontalAnimation } from "../../mesh/horizontal-animation";
import { MESH_Y } from "./position";

export const MAX_ANIMATION = 4;
export const MESH_WIDTH = 600;
export const MESH_HEIGHT = 600;

/** 
 * ネオラインドーザ アームハンマーチャージ
 * @param resources リソース管理オブジェクト
 * @return 生成したメッシュ
 */
export function neoLandozerHMCharge(resources: Resources): ArmdozerAnimation {
  const texture =
    resources.textures.find((v) => v.id === TEXTURE_IDS.NEO_LANDOZER_HM_CHARGE)
      ?.texture ?? new THREE.Texture();
  const ret = createHorizontalAnimation({
    texture,
    maxAnimation: MAX_ANIMATION,
    width: MESH_WIDTH,
    height: MESH_HEIGHT,
  });
  const object = ret.getObject3D();
  object.position.y = MESH_Y;
  object.position.z = 1;
  return ret;
}
