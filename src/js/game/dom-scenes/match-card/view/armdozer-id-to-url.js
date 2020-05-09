// @flow

import type {ResourcePath} from "../../../../resource/path/resource-path";
import type {ArmDozerId} from "gbraver-burst-core/lib/player/armdozer/armdozer";
import {ArmDozerIdList} from "gbraver-burst-core/lib/master/armdozers";

/**
 * アームドーザIDを画像URLに変換する
 *
 * @param resourcePath リソースパス
 * @param armDozerId アームドーザID
 * @return 画像URL
 */
export function armDozerId2URL(resourcePath: ResourcePath, armDozerId: ArmDozerId): string {
  switch (armDozerId) {
    case ArmDozerIdList.SHIN_BRAVER:
      return `${resourcePath.get()}/armdozer/shin-braver/player-select.png`;
    case ArmDozerIdList.NEO_LANDOZER:
      return `${resourcePath.get()}/armdozer/neo-landozer/player-select.png`;
    case ArmDozerIdList.LIGHTNING_DOZER:
      return `${resourcePath.get()}/armdozer/ligjtning-dozer/player-select.png`;
    default:
      return '';
  }
}