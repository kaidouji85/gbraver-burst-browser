// @flow

import {BatteryNumber} from "../../../../../game-object/battery-number/battery-number";
import {RecoverBattery} from "../../../../../game-object/recover-battery/recover-battery";
import {DamageIndicator} from "../../../../../game-object/damage-indicator/damage-indicator";
import type {Player, PlayerId} from "gbraver-burst-core";
import * as THREE from "three";
import type {Resources} from "../../../../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../../action/game-object-action";
import {enemyBatteryNumber, playerBatteryNumber} from "../../../../../game-object/battery-number";
import {enemyRecoverBattery, playerRecoverBattery} from "../../../../../game-object/recover-battery";
import {enemyDamageIndicator, playerDamageIndicator} from "../../../../../game-object/damage-indicator";
import {ShockWave} from "../../../../../game-object/hitmark/shock-wave/shock-wave";
import {enemyShockWave, playerShockWave} from "../../../../../game-object/hitmark/shock-wave";
import {Lightning} from "../../../../../game-object/hitmark/lightning/lightning";
import {enemyLightning, playerLightning} from "../../../../../game-object/hitmark/lightning";
import {ContinuousAttackIndicator} from "../../../../../game-object/continuous-attack/continuous-attack-indicator";
import {enemyTurnStart, playerTurnStart} from "../../../../../game-object/turn-start";
import {enemyPowerUp, playerPowerUp} from "../../../../../game-object/power-up";
import {enemyReflectIndicator, playerReflectIndicator} from "../../../../../game-object/reflect-indicator";
import {enemyContinuousAttack, playerContinuousAttack} from "../../../../../game-object/continuous-attack";
import {TurnStart} from "../../../../../game-object/turn-start/turn-start";
import {ReflectIndicator} from "../../../../../game-object/reflect-indicator/reflect-indicator";
import {PowerUp} from "../../../../../game-object/power-up/power-up";
import {DamageDecrease} from "../../../../../game-object/damage-decrease/damage-decrease";
import {enemyDamageDecrease, playerDamageDecrease} from "../../../../../game-object/damage-decrease";

/**
 * 3Dレイヤー プレイヤー関係オブジェクト フィールド
 */
export interface TDPlayerField {
  playerId: PlayerId;
  hitMark: {
    shockWave: ShockWave,
    lightning: Lightning,
  };
  armdozerEffects: {
    powerUp: PowerUp,
    reflect: ReflectIndicator,
    continuousAttack: ContinuousAttackIndicator,
    damageDecrease: DamageDecrease,
  };
  batteryNumber: BatteryNumber;
  recoverBattery: RecoverBattery;
  damageIndicator: DamageIndicator;
  turnStart: TurnStart;
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
  getObject3Ds(): typeof THREE.Object3D[];
}

/**
 * 3Dレイヤー プレイヤー関係オブジェクト 実装
 */
export class TDPlayerImpl implements TDPlayer {
  playerId: PlayerId;
  hitMark: {
    shockWave: ShockWave,
    lightning: Lightning,
  };
  armdozerEffects: {
    powerUp: PowerUp,
    reflect: ReflectIndicator,
    continuousAttack: ContinuousAttackIndicator,
    damageDecrease: DamageDecrease,
  };
  batteryNumber: BatteryNumber;
  recoverBattery: RecoverBattery;
  damageIndicator: DamageIndicator;
  /** @deprecated */
  turnStart: TurnStart;

  constructor(param: TDPlayerField) {
    this.playerId = param.playerId;
    this.hitMark = param.hitMark;
    this.armdozerEffects = param.armdozerEffects;
    this.batteryNumber = param.batteryNumber;
    this.recoverBattery = param.recoverBattery;
    this.damageIndicator = param.damageIndicator;
    this.turnStart = param.turnStart;
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.batteryNumber.destructor();
    this.damageIndicator.destructor();
    this.hitMark.shockWave.destructor();
    this.hitMark.lightning.destructor();
    this.armdozerEffects.powerUp.destructor();
    this.armdozerEffects.reflect.destructor();
    this.armdozerEffects.continuousAttack.destructor();
    this.armdozerEffects.damageDecrease.destructor();
    this.recoverBattery.destructor();
    this.turnStart.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): typeof THREE.Object3D[] {
    return [
      this.hitMark.shockWave.getObject3D(),
      this.hitMark.lightning.getObject3D(),
      this.armdozerEffects.powerUp.getObject3D(),
      this.armdozerEffects.reflect.getObject3D(),
      this.armdozerEffects.continuousAttack.getObject3D(),
      this.armdozerEffects.damageDecrease.getObject3D(),
      this.batteryNumber.getObject3D(),
      this.recoverBattery.getObject3D(),
      this.damageIndicator.getObject3D(),
      this.turnStart.getObject3D(),
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
    hitMark: {
      shockWave: playerShockWave(resources, listener),
      lightning: playerLightning(resources, listener)
    },
    armdozerEffects: {
      powerUp: playerPowerUp(resources, listener),
      reflect: playerReflectIndicator(resources, listener),
      continuousAttack: playerContinuousAttack(resources, listener),
      damageDecrease: playerDamageDecrease(resources, listener),
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
    hitMark: {
      shockWave: enemyShockWave(resources, listener),
      lightning: enemyLightning(resources, listener)
    },
    armdozerEffects: {
      powerUp: enemyPowerUp(resources, listener),
      reflect: enemyReflectIndicator(resources, listener),
      continuousAttack: enemyContinuousAttack(resources, listener),
      damageDecrease: enemyDamageDecrease(resources, listener),
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
  });
}