// @flow

import type {Resources} from "../../../../../../resource";
import type {Stream} from "../../../../../../stream/core";
import type {GameObjectAction} from "../../../../../../game-object/action/game-object-action";
import type {ArmDozerId} from "gbraver-burst-core";
import {ArmDozerIdList} from 'gbraver-burst-core';
import {BurstButton} from "../../../../../../game-object/burst-button/burst-button";
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
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param armDozerId アームドーザID
 * @return バーストボタン
 */
export function createBurstButton(resources: Resources, gameObjectAction: Stream<GameObjectAction>, armDozerId: ArmDozerId): BurstButton {
  switch (armDozerId) {
    case ArmDozerIdList.SHIN_BRAVER:
      return shinBraverBurstButton(resources, gameObjectAction);
    case ArmDozerIdList.NEO_LANDOZER:
      return neoLandozerBurstButton(resources, gameObjectAction);
    case ArmDozerIdList.LIGHTNING_DOZER:
      return lightningDozerBurstButton(resources, gameObjectAction);
    case ArmDozerIdList.WING_DOZER:
      return wingDozerBurstButton(resources, gameObjectAction);
    default:
      return shinBraverBurstButton(resources, gameObjectAction);
  }
}