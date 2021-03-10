// @flow

import type {Player} from "gbraver-burst-core";
import {ArmDozerIdList} from "gbraver-burst-core";
import type {Resources} from "../../../../../../resource";
import {Observable} from "rxjs";
import {enemyLightningDozerTD, playerLightningDozerTD} from "./lightning-dozer";
import type {TDArmdozerObjects} from "./armdozer-objects";
import {enemyShinBraverTD, playerShinBraverTD} from "./shin-braver";
import {enemyWingDozerTD, playerWingDozerTD} from "./wing-dozer";
import {enemyNeoLandozerTD, playerNeoLandozerTD} from "./neo-landozer";
import type {GameObjectAction} from "../../../../../../game-object/action/game-object-action";
import {toStream} from "../../../../../../stream/rxjs";

/**
 * プレイヤー側  3Dレイヤー アームドーザ固有オブジェクト
 *
 * @param resources リソース管理オブジェクト
 * @param listener イベントリスナ
 * @param state プレイヤーの状態
 * @return 生成結果
 */
export function playerTDArmdozer(resources: Resources, listener: Observable<GameObjectAction>, state: Player): TDArmdozerObjects {
  switch (state.armdozer.id) {
    case ArmDozerIdList.SHIN_BRAVER:
      return playerShinBraverTD(resources, toStream(listener), state);
    case ArmDozerIdList.LIGHTNING_DOZER:
      return playerLightningDozerTD(resources, toStream(listener), state);
    case ArmDozerIdList.WING_DOZER:
      return playerWingDozerTD(resources, toStream(listener), state);
    case ArmDozerIdList.NEO_LANDOZER:
      return playerNeoLandozerTD(resources, toStream(listener), state);
    default:
      return playerShinBraverTD(resources, toStream(listener), state);
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
export function enemyTDArmdozer(resources: Resources, listener: Observable<GameObjectAction>, state: Player): TDArmdozerObjects {
  switch (state.armdozer.id) {
    case ArmDozerIdList.SHIN_BRAVER:
      return enemyShinBraverTD(resources, toStream(listener), state);
    case ArmDozerIdList.LIGHTNING_DOZER:
      return enemyLightningDozerTD(resources, toStream(listener), state);
    case ArmDozerIdList.WING_DOZER:
      return enemyWingDozerTD(resources, toStream(listener), state);
    case ArmDozerIdList.NEO_LANDOZER:
      return enemyNeoLandozerTD(resources, toStream(listener), state);
    default:
      return enemyShinBraverTD(resources, toStream(listener), state);
  }
}