// @flow

import type {Player} from "gbraver-burst-core";
import {ArmDozerIdList} from "gbraver-burst-core";
import type {Resources} from "../../../../../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../../../action/game-object-action";
import {EmptyTDArmdozer} from "./empty";
import {enemyLightningDozerTD, playerLightningDozerTD} from "./lightning-dozer";
import type {TDArmdozerObjects} from "./armdozer-objects";

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
    case ArmDozerIdList.LIGHTNING_DOZER:
      return playerLightningDozerTD(resources, listener, state);
    default:
      return new EmptyTDArmdozer(state);
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
    case ArmDozerIdList.LIGHTNING_DOZER:
      return enemyLightningDozerTD(resources, listener, state);
    default:
      return new EmptyTDArmdozer(state);
  }
}