// @flow

import {BatteryNumber} from "../../../../../game-object/battery-number/battery-number";
import {RecoverBattery} from "../../../../../game-object/recover-battery/recover-battery";
import {DamageIndicator} from "../../../../../game-object/damage-indicator/damage-indicator";
import type {Player, PlayerId} from "gbraver-burst-core";
import {Spark} from "../../../../../game-object/hitmark/spark/spark";
import * as THREE from "three";
import {TurnStart} from "../../../../../game-object/turn-start/turn-start";
import {Gauge} from "../../../../../game-object/gauge/gauge";
import {BurstIndicator} from "../../../../../game-object/burst-indicator/burst-indicator";
import type {Resources} from "../../../../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../../action/game-object-action";
import {enemyGauge, playerGauge} from "../../../../../game-object/gauge";
import {enemySpark, playerSpark} from "../../../../../game-object/hitmark/spark";
import {enemyBatteryNumber, playerBatteryNumber} from "../../../../../game-object/battery-number";
import {enemyRecoverBattery, playerRecoverBattery} from "../../../../../game-object/recover-battery";
import {enemyDamageIndicator, playerDamageIndicator} from "../../../../../game-object/damage-indicator";
import {enemyTurnStart, playerTurnStart} from "../../../../../game-object/turn-start";
import {enemyBurstIndicator, playerBurstIndicator} from "../../../../../game-object/burst-indicator";

/**
 * コンストラクタのパラメータ
 */
export type Param = {
  playerId: PlayerId,
  gauge: Gauge,
  hitMark: {
    spark: Spark
  },
  batteryNumber: BatteryNumber,
  recoverBattery: RecoverBattery,
  damageIndicator: DamageIndicator,
  turnStart: TurnStart,
  burstIndicator: BurstIndicator,
};

/**
 * 3Dレイヤーのプレイヤー関係オブジェクト
 */
export class TDPlayer {
  playerId: PlayerId;
  gauge: Gauge;
  hitMark: {
    spark: Spark
  };
  batteryNumber: BatteryNumber;
  recoverBattery: RecoverBattery;
  damageIndicator: DamageIndicator;
  turnStart: TurnStart;
  burstIndicator: BurstIndicator;

  constructor(param: Param) {
    this.playerId = param.playerId;
    this.gauge = param.gauge;
    this.hitMark = param.hitMark;
    this.batteryNumber = param.batteryNumber;
    this.recoverBattery = param.recoverBattery;
    this.damageIndicator = param.damageIndicator;
    this.turnStart = param.turnStart;
    this.burstIndicator = param.burstIndicator;
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.gauge.destructor();
    this.batteryNumber.destructor();
    this.damageIndicator.destructor();
    this.hitMark.spark.destructor();
    this.recoverBattery.destructor();
    this.turnStart.destructor();
    this.burstIndicator.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): THREE.Object3D[] {
    return [
      this.gauge.getObject3D(),
      this.hitMark.spark.getObject3D(),
      this.batteryNumber.getObject3D(),
      this.recoverBattery.getObject3D(),
      this.damageIndicator.getObject3D(),
      this.turnStart.getObject3D(),
      this.burstIndicator.getObject3D(),
    ];
  }
}

/**
 * プレイヤー側の3Dプレイヤーオブジェクト
 *
 * @param resources リソース管理オブジェクト
 * @param state プレイヤーステータス
 * @param listener リスナー
 * @return 3Dプレイヤーオブジェクト
 */
export function playerTDObjects(resources: Resources, state: Player, listener: Observable<GameObjectAction>): TDPlayer {
  const param = {
    playerId: state.playerId,
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
  };
  return new TDPlayer(param);
}

/**
 * 敵側の3Dプレイヤーオブジェクト
 *
 * @param resources リソース管理オブジェクト
 * @param state プレイヤーステータス
 * @param listener リスナー
 * @return 3Dプレイヤーオブジェクト
 */
export function enemyTDObject(resources: Resources, state: Player, listener: Observable<GameObjectAction>): TDPlayer {
  const param = {
    playerId: state.playerId,
    gauge: enemyGauge({
      resources: resources,
      listener: listener,
      hp: state.armdozer.maxHp,
      battery: state.armdozer.maxBattery,
    }),
    hitMark: {
      spark: enemySpark(resources, listener),
    },
    batteryNumber: enemyBatteryNumber({
      resources: resources,
      listener: listener
    }),
    recoverBattery: enemyRecoverBattery(resources, listener),
    damageIndicator: enemyDamageIndicator({
      resources: resources,
      listener: listener
    }),
    turnStart: enemyTurnStart(resources, listener),
    burstIndicator: enemyBurstIndicator(resources, listener)
  };
  return new TDPlayer(param);
}