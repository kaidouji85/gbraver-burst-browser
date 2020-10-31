// @flow

import type {Player} from "gbraver-burst-core";
import {ArmDozerIdList} from "gbraver-burst-core";
import type {Resources} from "../../../../../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../../../action/game-object-action";
import {enemyLightningDozerTD, playerLightningDozerTD} from "./lightning-dozer";
import type {TDArmdozerObjects} from "./armdozer-objects";
import {enemyShinBraverTD, playerShinBraverTD} from "./shin-braver";

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
      return playerShinBraverTD(resources, listener, state);
    case ArmDozerIdList.LIGHTNING_DOZER:
      return playerLightningDozerTD(resources, listener, state);
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
export function enemyTDArmdozer(resources: Resources, listener: Observable<GameObjectAction>, state: Player): TDArmdozerObjects {
  switch (state.armdozer.id) {
    case ArmDozerIdList.SHIN_BRAVER:
      return enemyShinBraverTD(resources, listener, state);
    case ArmDozerIdList.LIGHTNING_DOZER:
      return enemyLightningDozerTD(resources, listener, state);
    default:
      return enemyShinBraverTD(resources, listener, state);
  }
}