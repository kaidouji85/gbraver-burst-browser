// @flow

import type {ArmdozerIcon} from "./armdozer-icon";
import type {ArmDozerId} from "gbraver-burst-core/lib/player/armdozer";
import {ArmDozerIdList} from "gbraver-burst-core/lib/master/armdozers";
import type {Resources} from "../../../resource";
import {ShinBraverIcon} from "./shin-braver";
import {NeoLandozerIcon} from "./neo-landozer";
import {LightningDozerIcon} from "./lightning-dozer";

/**
 * アームドーザIDに対応したアイコンを生成する
 *
 * @param armDozerId アームドーザアイコン
 * @param resources リソース管理オブジェクト
 * @return アームドーザアイコン
 */
export function createArmdozerIcon(armDozerId: ArmDozerId, resources: Resources): ArmdozerIcon {
  switch (armDozerId) {
    case ArmDozerIdList.SHIN_BRAVER:
      return new ShinBraverIcon(resources);
    case ArmDozerIdList.NEO_LANDOZER:
      return new NeoLandozerIcon(resources);
    case ArmDozerIdList.LIGHTNING_DOZER:
      return new LightningDozerIcon(resources);
    default:
      return new ShinBraverIcon(resources);
  }
}