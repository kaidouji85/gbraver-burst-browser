// @flow
import type {Resources} from "../../../../../resource";
import type {ArmDozerSprite} from "../../../../../game-object/armdozer/armdozer-sprite";
import {PlayerShinBraver} from "../../../../../game-object/armdozer/shin-breaver";
import type {Player} from "gbraver-burst-core/lib/player/player";
import {PlayerNeoLandozer} from "../../../../../game-object/armdozer/neo-landozer";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../../action/game-object-action";
import type {PlayerState} from "gbraver-burst-core/lib/game-state/player-state";
import {playerGauge} from "../../../../../game-object/gauge";
import {playerBatteryNumber} from "../../../../../game-object/battery-number";
import {playerRecoverBattery} from "../../../../../game-object/recover-battery";
import {playerDamageIndicator} from "../../../../../game-object/damage-indicator";
import type {ArmdozerObjects} from "./armdozer-objects";

/** プレイヤーのアームドーザオブジェクトを生成する */
export function playerArmdozerObjects(resources: Resources, state: PlayerState, listener: Observable<GameObjectAction>): ArmdozerObjects<ArmDozerSprite> {
  return {
    sprite: createPlayerSprite(resources, listener, state),
    gauge: playerGauge({
      resources: resources,
      listener: listener,
      hp: state.armdozer.maxHp,
      battery: state.armdozer.maxBattery
    }),
    batteryNumber: playerBatteryNumber({
      resources: resources,
      listener: listener
    }),
    recoverBattery: playerRecoverBattery(resources, listener),
    damageIndicator: playerDamageIndicator({
      resources: resources,
      listener: listener
    })
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