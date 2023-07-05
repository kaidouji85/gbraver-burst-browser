import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { MESH_Y } from "./position";
import {createNeoLandozerMesh} from "./create-mesh";
import {MESH_HEIGHT, MESH_WIDTH} from "./mesh-size";

/** アニメーション枚数 */
export const MAX_ANIMATION = 4;
/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.NEO_LANDOZER_DOWN;

/**
 * ネオラインドーザ 立ち -> ダウン
 * @param resources リソース管理オブジェクト
 * @return 生成したメッシュ
 */
export function neoLandozerDown(resources: Resources): ArmdozerAnimation {
  return createNeoLandozerMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
    width: MESH_WIDTH,
    height: MESH_HEIGHT,
    positionY: MESH_Y,
  });
}
