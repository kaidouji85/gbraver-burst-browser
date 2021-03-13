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
 * @param listener イベントリスナ
 * @param state プレイヤーの状態
 * @return 生成結果
 */
export function playerTDArmdozer(resources: Resources, listener: Stream<GameObjectAction>, state: Player): TDArmdozerObjects {
  switch (state.armdozer.id) {
    case ArmDozerIdList.SHIN_BRAVER:
      return playerShinBraverTD(resources, listener, state);
    case ArmDozerIdList.LIGHTNING_DOZER:
      return playerLightningDozerTD(resources, listener, state);
    case ArmDozerIdList.WING_DOZER:
      return playerWingDozerTD(resources, listener, state);
    case ArmDozerIdList.NEO_LANDOZER:
      return playerNeoLandozerTD(resources, listener, state);
    default:
      return playerShinBraverTD(resources, listener, state);
  }
}

/**
 * 敵側  3Dレイヤー アームドーザ固有オブジェクト
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param state プレイヤーの状態
 * @return 生成結果
 */
export function enemyTDArmdozer(resources: Resources, listener: Stream<GameObjectAction>, state: Player): TDArmdozerObjects {
  switch (state.armdozer.id) {
    case ArmDozerIdList.SHIN_BRAVER:
      return enemyShinBraverTD(resources, listener, state);
    case ArmDozerIdList.LIGHTNING_DOZER:
      return enemyLightningDozerTD(resources, listener, state);
    case ArmDozerIdList.WING_DOZER:
      return enemyWingDozerTD(resources, listener, state);
    case ArmDozerIdList.NEO_LANDOZER:
      return enemyNeoLandozerTD(resources, listener, state);
    default:
      return enemyShinBraverTD(resources, listener, state);
  }
}