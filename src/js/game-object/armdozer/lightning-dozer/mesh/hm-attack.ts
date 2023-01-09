import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createHorizontalAnimationFromResources } from "../../mesh/horizontal-animation";
import { MESH_Y } from "./position";
export const MESH_WIDTH = 600;
export const MESH_HEIGHT = 600;
export const MAX_ANIMATION = 4;

/**
 * ライトニングドーザ アームハンマー 攻撃
 *
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function lightningDozerHmAttack(
  resources: Resources
): ArmdozerAnimation {
  const ret = createHorizontalAnimationFromResources({
    id: TEXTURE_IDS.LIGHTNING_DOZER_HM_ATTACK,
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
