import type {Resources} from "../../../../resource";
import {TEXTURE_IDS} from "../../../../resource/texture/ids";
import type {ArmdozerAnimation} from "../../mesh/armdozer-animation";
import {OutlineWidth} from "./outline-width";
import {MESH_Y} from "./position";
import {createNeoLandozerMesh} from "./create-mesh";
import {MESH_HEIGHT, MESH_WIDTH} from "./mesh-size";
import {createNeoLandozerActiveMesh} from "./create-active-mesh";
import {createNeoLandozerOutlineMesh} from "./create-outline-mesh";

/** アニメーション枚数 */
export const MAX_ANIMATION = 4;
/** テクスチャID */
export const TEXTURE_ID = TEXTURE_IDS.NEO_LANDOZER_GUTS_UP;

/**
 * ネオラインドーザ ガッツアップ メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function neoLandozerGutsUp(resources: Resources): ArmdozerAnimation {
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
 * ネオラインドーザ アクティブガッツアップ メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function neoLandozerActiveGutsUp(
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
 * ネオラインドーザ アウトラインガッツアップ メッシュ生成
 * @param resources リソース管理オブジェクト
 * @return メッシュ
 */
export function neoLandozerOutlineGutsUp(
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
