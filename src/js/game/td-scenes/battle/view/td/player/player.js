// @flow
import type {Resources} from "../../../../../../resource";
import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
import {PlayerShinBraver} from "../../../../../../game-object/armdozer/shin-braver";
import type {Player} from "gbraver-burst-core/lib/player/player";
import {PlayerNeoLandozer} from "../../../../../../game-object/armdozer/neo-landozer";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../../../action/game-object-action";
import type {PlayerState} from "gbraver-burst-core/lib/game-state/player-state";
import {playerBatteryNumber} from "../../../../../../game-object/battery-number";
import {playerRecoverBattery} from "../../../../../../game-object/recover-battery";
import {playerDamageIndicator} from "../../../../../../game-object/damage-indicator";
import type {TDPlayer} from "./index";
import {playerSpark} from "../../../../../../game-object/hitmark/spark";
import {playerTurnStart} from "../../../../../../game-object/turn-start";
import {playerGauge} from "../../../../../../game-object/gauge";
import {playerBurstIndicator} from "../../../../../../game-object/burst-indicator";

/**
 * プレイヤー側の3Dプレイヤーオブジェクト
 *
 * @param resources リソース管理オブジェクト
 * @param state プレイヤーステータス
 * @param listener リスナー
 * @return 3Dプレイヤーオブジェクト
 */
export function playerTDObjects(resources: Resources, state: PlayerState, listener: Observable<GameObjectAction>): TDPlayer<ArmDozerSprite> {
  return {
    playerId: state.playerId,
    sprite: createPlayerSprite(resources, listener, state),
    gauge: playerGauge({
      resources: resources,
      listener: listener,
      hp: state.armdozer.maxHp,
      battery: state.armdozer.maxBattery,
    }),
    hitMark: {
      spark: playerSpark(resources, listener),
    },
    batteryNumber: playerBatteryNumber({
      resources: resources,
      listener: listener
    }),
    recoverBattery: playerRecoverBattery(resources, listener),
    damageIndicator: playerDamageIndicator({
      resources: resources,
      listener: listener
    }),
    turnStart: playerTurnStart(resources, listener),
    burstIndicator: playerBurstIndicator(resources, listener)
  }
}

/** 与えられたパラメータからプレイヤースプライを生成する */
export function createPlayerSprite(resources: Resources, listener: Observable<GameObjectAction>, playerInfo: Player): ArmDozerSprite {
  switch (playerInfo.armdozer.appearance) {
    case 'neo-landozer':
      return PlayerNeoLandozer(resources, listener);
    case 'shin-braver':
    default:
      return PlayerShinBraver(resources, listener);
  }
}