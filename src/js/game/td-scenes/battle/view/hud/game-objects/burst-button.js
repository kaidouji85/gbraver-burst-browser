// @flow

import type {Resources} from "../../../../../../resource";
import type {Stream} from "../../../../../../stream/core";
import type {GameObjectAction} from "../../../../../../game-object/action/game-object-action";
import type {ArmDozerId} from "gbraver-burst-core";
import {BurstButton} from "../../../../../../game-object/burst-button/burst-button";
import {ArmDozerIdList} from "gbraver-burst-core/lib/master/armdozers";
import {
  lightningDozerBurstButton,
  neoLandozerBurstButton,
  shinBraverBurstButton,
  wingDozerBurstButton
} from "../../../../../../game-object/burst-button";

/**
 * アームドーザIDに対応したバーストボタンを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param armDozerId アームドーザID
 * @return バーストボタン
 */
export function createBurstButton(resources: Resources, listener: Stream<GameObjectAction>, armDozerId: ArmDozerId): BurstButton {
  switch (armDozerId) {
    case ArmDozerIdList.SHIN_BRAVER:
      return shinBraverBurstButton(resources, listener);
    case ArmDozerIdList.NEO_LANDOZER:
      return neoLandozerBurstButton(resources, listener);
    case ArmDozerIdList.LIGHTNING_DOZER:
      return lightningDozerBurstButton(resources, listener);
    case ArmDozerIdList.WING_DOZER:
      return wingDozerBurstButton(resources, listener);
    default:
      return shinBraverBurstButton(resources, listener);
  }
}