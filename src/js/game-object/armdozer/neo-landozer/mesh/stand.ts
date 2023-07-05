import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { createNeoLandozerActiveMesh } from "./create-active-mesh";
import { createNeoLandozerMesh } from "./create-mesh";
import { createNeoLandozerOutlineMesh } from "./create-outline-mesh";
import { MESH_HEIGHT, MESH_WIDTH } from "./mesh-size";
import { OutlineWidth } from "./outline-width";
import { MESH_Y } from "./position";

/** アニメーション枚数 */
export const MAX_ANIMATION = 1;
/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.NEO_LANDOZER_STAND;

/**
 * ネオラインドーザ 立ち メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function neoLandozerStand(resources: Resources): ArmdozerAnimation {
  return createNeoLandozerMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
    width: MESH_WIDTH,
    height: MESH_HEIGHT,
    positionY: MESH_Y,
  });
}

/**
 * ネオラインドーザ アクティブ立ち メッシュを生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function neoLandozerActiveStand(
  resources: Resources
): ArmdozerAnimation {
  return createNeoLandozerActiveMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
    width: MESH_WIDTH,
    height: MESH_HEIGHT,
    positionY: MESH_Y,
  });
}

/**
 * ネオラインドーザ アウトライン立ち メッシュを生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function neoLandozerOutlineStand(
  resources: Resources
): ArmdozerAnimation {
  return createNeoLandozerOutlineMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
    width: MESH_WIDTH,
    height: MESH_HEIGHT,
    positionY: MESH_Y,
    outlineWidth: OutlineWidth,
  });
}
