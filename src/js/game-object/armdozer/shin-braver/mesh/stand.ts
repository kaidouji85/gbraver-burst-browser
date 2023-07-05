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
export const TEXTURE_ID = TEXTURE_IDS.SHIN_BRAVER_STAND;
/** アニメーション枚数 */
export const MAX_ANIMATION = 1;

/**
 * シンブレイバー立ちポーズメッシュを生成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function shinBraverStand(resources: Resources): ArmdozerAnimation {
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
 * シンブレイバーアクティブ立ちポーズメッシュを生成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function shinBraverActiveStand(resources: Resources): ArmdozerAnimation {
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
 * シンブレイバーアウトライン立ちポーズメッシュを生成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function shinBraverOutlineStand(
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
