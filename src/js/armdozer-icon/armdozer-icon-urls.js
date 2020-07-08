// @flow

import type {ResourceRoot} from "../resource/root/resource-root";
import type {ArmDozerId} from "gbraver-burst-core";
import {ArmDozerIdList} from "gbraver-burst-core";

// TODO 削除する
/**
 * アームドーザIDに対応するアイコン画像のURLを返す
 *
 * @param resourcePath リソースパス
 * @param armDozerId アームドーザID
 * @return 画像URL
 */
export function getArmdozerIconURL(resourcePath: ResourceRoot, armDozerId: ArmDozerId): string {
  switch (armDozerId) {
    case ArmDozerIdList.SHIN_BRAVER:
      return shinBraverIconURL(resourcePath);
    case ArmDozerIdList.NEO_LANDOZER:
      return neoLandozerIconURL(resourcePath);
    case ArmDozerIdList.LIGHTNING_DOZER:
      return lightningDozerIconURL(resourcePath);
    case ArmDozerIdList.WING_DOZER:
      return wingDozerIconURL(resourcePath);
    default:
      return shinBraverIconURL(resourcePath);
  }
}

// TODO 削除する
/**
 * シンブレイバー アイコン URL
 *
 * @param resourcePath リソースパス
 * @return URL
 */
export function shinBraverIconURL(resourcePath: ResourceRoot): string {
  return `${resourcePath.get()}/armdozer/shin-braver/player-select.png`;
}

// TODO 削除する
/**
 * ネオランドーザ アイコン URL
 *
 * @param resourcePath リソースパス
 * @return URL
 */
export function neoLandozerIconURL(resourcePath: ResourceRoot): string {
  return `${resourcePath.get()}/armdozer/neo-landozer/player-select.png`;
}

// TODO 削除する
/**
 * ライトニングドーザ アイコン URL
 *
 * @param resourcePath リソースパス
 * @return URL
 */
export function lightningDozerIconURL(resourcePath: ResourceRoot): string {
  return `${resourcePath.get()}/armdozer/lightning-dozer/player-select.png`;
}

// TODO 削除する
/**
 * ウィングドーザ アイコン URL
 * @param resourcePath リソースパス
 * @return URL
 */
export function wingDozerIconURL(resourcePath: ResourceRoot): string {
  return `${resourcePath.get()}/armdozer/wing-dozer/player-select.png`;
}