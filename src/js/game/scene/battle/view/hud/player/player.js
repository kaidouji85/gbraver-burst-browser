// @flow

import type {Resources} from "../../../../../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../../../action/game-object-action";
import type {Player} from "gbraver-burst-core/lib/player/player";
import {playerGauge} from "../../../../../../game-object/gauge";
import type {HUDPlayer} from "./index";

/**
 * プレイヤーHUDオブジェクト
 *
 * @param resources リソース管理オブジェクト
 * @param listener リスナー
 * @param player プレイヤーステータス
 * @return HUDオブジェクト
 */
export function playerHUDObjects(resources: Resources, listener: Observable<GameObjectAction>, player: Player): HUDPlayer {
  return {
    playerId: player.playerId,
    gauge: playerGauge({
      resources: resources,
      listener: listener,
      hp: player.armdozer.maxHp,
      battery: player.armdozer.maxBattery,
    })
  };
}