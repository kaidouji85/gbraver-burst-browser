import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { OutlineWidth } from "./outline-width";
import { MESH_Y } from "./position";
import { createShinBraverMesh } from "./create-mesh";
import { createShinBraverActiveMesh } from "./create-active-mesh";
import { createShinBraverOutlineMesh } from "./create-outline-mesh";

/** メッシュ幅 */
export const MESH_WIDTH = 600;
/** メッシュ高 */
export const MESH_HEIGHT = 600;
/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.SHIN_BRAVER_BURST_UP;
/** アニメーション枚数 */
export const MAX_ANIMATION = 4;

/**
 * バーストアップメッシュを作成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function shinBraverBurstUp(resources: Resources): ArmdozerAnimation {
  return createShinBraverMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
    width: MESH_WIDTH,
    height: MESH_HEIGHT,
    positionY: MESH_Y,
  });
}

/**
 * アクティブバーストアップメッシュを作成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function shinBraverActiveBurstUp(
  resources: Resources
): ArmdozerAnimation {
  return createShinBraverActiveMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
    width: MESH_WIDTH,
    height: MESH_HEIGHT,
    positionY: MESH_Y,
  });
}

/**
 * アウトラインバーストアップメッシュを作成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function shinBraverOutlineBurstUp(
  resources: Resources
): ArmdozerAnimation {
  return createShinBraverOutlineMesh({
    resources,
    textureId: TEXTURE_ID,
    maxAnimation: MAX_ANIMATION,
    width: MESH_WIDTH,
    height: MESH_HEIGHT,
    positionY: MESH_Y,
    outlineWidth: OutlineWidth,
  });
}
