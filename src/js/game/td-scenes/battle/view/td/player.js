// @flow

import {BatteryNumber} from "../../../../../game-object/battery-number/battery-number";
import {RecoverBattery} from "../../../../../game-object/recover-battery/recover-battery";
import {DamageIndicator} from "../../../../../game-object/damage-indicator/damage-indicator";
import type {Player, PlayerId} from "gbraver-burst-core";
import * as THREE from "three";
import {TurnStart} from "../../../../../game-object/turn-start/turn-start";
import {Gauge} from "../../../../../game-object/gauge/gauge";
import {BurstIndicator} from "../../../../../game-object/burst-indicator/burst-indicator";
import type {Resources} from "../../../../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../../action/game-object-action";
import {enemyGauge, playerGauge} from "../../../../../game-object/gauge";
import {enemyBatteryNumber, playerBatteryNumber} from "../../../../../game-object/battery-number";
import {enemyRecoverBattery, playerRecoverBattery} from "../../../../../game-object/recover-battery";
import {enemyDamageIndicator, playerDamageIndicator} from "../../../../../game-object/damage-indicator";
import {enemyTurnStart, playerTurnStart} from "../../../../../game-object/turn-start";
import {enemyBurstIndicator, playerBurstIndicator} from "../../../../../game-object/burst-indicator";
import {ShockWave} from "../../../../../game-object/hitmark/shock-wave/shock-wave";
import {enemyShockWave, playerShockWave} from "../../../../../game-object/hitmark/shock-wave";
import {Lightning} from "../../../../../game-object/hitmark/lightning/lightning";
import {enemyLightning, playerLightning} from "../../../../../game-object/hitmark/lightning";

/**
 * 3Dレイヤー プレイヤー関係オブジェクト フィールド
 */
export interface TDPlayerField {
  playerId: PlayerId;
  gauge: Gauge;
  hitMark: {
    shockWave: ShockWave,
    lightning: Lightning,
  };
  batteryNumber: BatteryNumber;
  recoverBattery: RecoverBattery;
  damageIndicator: DamageIndicator;
  turnStart: TurnStart;
  burstIndicator: BurstIndicator;
}

/**
 * 3Dレイヤー プレイヤー関係オブジェクト
 */
export interface TDPlayer extends TDPlayerField {
  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): THREE.Object3D[];
}

/**
 * 3Dレイヤー プレイヤー関係オブジェクト 実装
 */
export class TDPlayerImpl implements TDPlayer {
  playerId: PlayerId;
  gauge: Gauge;
  hitMark: {
    shockWave: ShockWave,
    lightning: Lightning,
  };
  batteryNumber: BatteryNumber;
  recoverBattery: RecoverBattery;
  damageIndicator: DamageIndicator;
  turnStart: TurnStart;
  burstIndicator: BurstIndicator;

  constructor(param: TDPlayerField) {
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
    this.hitMark.shockWave.destructor();
    this.hitMark.lightning.destructor();
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
      this.hitMark.shockWave.getObject3D(),
      this.hitMark.lightning.getObject3D(),
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
  return new TDPlayerImpl({
    playerId: state.playerId,
    gauge: playerGauge({
      resources: resources,
      listener: listener,
      hp: state.armdozer.maxHp,
      battery: state.armdozer.maxBattery,
    }),
    hitMark: {
      shockWave: playerShockWave(resources, listener),
      lightning: playerLightning(resources, listener)
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
  });
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
  return new TDPlayerImpl({
    playerId: state.playerId,
    gauge: enemyGauge({
      resources: resources,
      listener: listener,
      hp: state.armdozer.maxHp,
      battery: state.armdozer.maxBattery,
    }),
    hitMark: {
      shockWave: enemyShockWave(resources, listener),
      lightning: enemyLightning(resources, listener)
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
  });
}