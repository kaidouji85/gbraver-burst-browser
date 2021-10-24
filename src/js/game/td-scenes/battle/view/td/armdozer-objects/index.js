// @flow

import type {Player} from "gbraver-burst-core";
import {ArmDozerIdList} from "gbraver-burst-core";
import type {Resources} from "../../../../../../resource";
import {enemyLightningDozerTD, playerLightningDozerTD} from "./lightning-dozer";
import type {TDArmdozerObjects} from "./armdozer-objects";
import {enemyShinBraverTD, playerShinBraverTD} from "./shin-braver";
import {enemyWingDozerTD, playerWingDozerTD} from "./wing-dozer";
import {enemyNeoLandozerTD, playerNeoLandozerTD} from "./neo-landozer";
import type {GameObjectAction} from "../../../../../../game-object/action/game-object-action";
import type {Stream} from "../../../../../../stream/core";

/**
 * プレイヤー側  3Dレイヤー アームドーザ固有オブジェクト
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤーの状態
 * @return 生成結果
 */
export function playerTDArmdozer(resources: Resources, gameObjectAction: Stream<GameObjectAction>, state: Player): TDArmdozerObjects {
  switch (state.armdozer.id) {
    case ArmDozerIdList.SHIN_BRAVER:
      return playerShinBraverTD(resources, gameObjectAction, state);
    case ArmDozerIdList.LIGHTNING_DOZER:
      return playerLightningDozerTD(resources, gameObjectAction, state);
    case ArmDozerIdList.WING_DOZER:
      return playerWingDozerTD(resources, gameObjectAction, state);
    case ArmDozerIdList.NEO_LANDOZER:
      return playerNeoLandozerTD(resources, gameObjectAction, state);
    default:
      return playerShinBraverTD(resources, gameObjectAction, state);
  }
}

/**
 * 敵側  3Dレイヤー アームドーザ固有オブジェクト
 *
 * @param resources リソース管理オブジェクト
 * @param gameObjectAction ゲームオブジェクトアクション
 * @param state プレイヤーの状態
 * @return 生成結果
 */
export function enemyTDArmdozer(resources: Resources, gameObjectAction: Stream<GameObjectAction>, state: Player): TDArmdozerObjects {
  switch (state.armdozer.id) {
    case ArmDozerIdList.SHIN_BRAVER:
      return enemyShinBraverTD(resources, gameObjectAction, state);
    case ArmDozerIdList.LIGHTNING_DOZER:
      return enemyLightningDozerTD(resources, gameObjectAction, state);
    case ArmDozerIdList.WING_DOZER:
      return enemyWingDozerTD(resources, gameObjectAction, state);
    case ArmDozerIdList.NEO_LANDOZER:
      return enemyNeoLandozerTD(resources, gameObjectAction, state);
    default:
      return enemyShinBraverTD(resources, gameObjectAction, state);
  }
}