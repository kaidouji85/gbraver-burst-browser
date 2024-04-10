import type { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import {
  enemyBatteryCorrect,
  playerBatteryCorrect,
} from "../../../../game-object/battery-correct";
import { BatteryCorrect } from "../../../../game-object/battery-correct/battery-correct";
import {
  enemyBatteryEnchantment,
  playerBatteryEnchantment,
} from "../../../../game-object/battery-enchantment";
import { BatteryEnchantment } from "../../../../game-object/battery-enchantment/battery-enchantment";
import {
  enemyBatteryNumber,
  playerBatteryNumber,
} from "../../../../game-object/battery-number";
import { BatteryNumber } from "../../../../game-object/battery-number/battery-number";
import {
  enemyContinuousAttack,
  playerContinuousAttack,
} from "../../../../game-object/continuous-attack";
import { ContinuousAttackIndicator } from "../../../../game-object/continuous-attack/continuous-attack-indicator";
import {
  enemyDamageHalved,
  playerDamageHalved,
} from "../../../../game-object/damage-halved";
import { DamageHalved } from "../../../../game-object/damage-halved/damage-halved";
import {
  enemyDamageIndicator,
  playerDamageIndicator,
} from "../../../../game-object/damage-indicator";
import { DamageIndicator } from "../../../../game-object/damage-indicator/damage-indicator";
import {
  enemyLightning,
  playerLightning,
} from "../../../../game-object/hitmark/lightning";
import { Lightning } from "../../../../game-object/hitmark/lightning/lightning";
import {
  enemyShockWave,
  playerShockWave,
} from "../../../../game-object/hitmark/shock-wave";
import { ShockWave } from "../../../../game-object/hitmark/shock-wave/shock-wave";
import { enemyPowerUp, playerPowerUp } from "../../../../game-object/power-up";
import { PowerUp } from "../../../../game-object/power-up/power-up";
import {
  enemyRecoverBattery,
  playerRecoverBattery,
} from "../../../../game-object/recover-battery";
import { RecoverBattery } from "../../../../game-object/recover-battery/recover-battery";
import {
  enemyReflectIndicator,
  playerReflectIndicator,
} from "../../../../game-object/reflect-indicator";
import { ReflectIndicator } from "../../../../game-object/reflect-indicator/reflect-indicator";
import { GenerateTDLayerObjectParams } from "./generate-params";

/**
 * 3Dレイヤー プレイヤー関係オブジェクト フィールド
 */
export interface TDPlayerField {
  playerId: PlayerId;
  hitMark: {
    shockWave: ShockWave;
    lightning: Lightning;
  };
  armdozerEffects: {
    powerUp: PowerUp;
    reflect: ReflectIndicator;
    continuousAttack: ContinuousAttackIndicator;
    damageHalved: DamageHalved;
    batteryEnchantment: BatteryEnchantment;
  };
  batteryNumber: BatteryNumber;
  batteryCorrect: BatteryCorrect;
  recoverBattery: RecoverBattery;
  damageIndicator: DamageIndicator;
}

/** 3Dレイヤー プレイヤー関係オブジェクト */
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
  hitMark: {
    shockWave: ShockWave;
    lightning: Lightning;
  };
  armdozerEffects: {
    powerUp: PowerUp;
    reflect: ReflectIndicator;
    continuousAttack: ContinuousAttackIndicator;
    damageHalved: DamageHalved;
    batteryEnchantment: BatteryEnchantment;
  };
  batteryNumber: BatteryNumber;
  batteryCorrect: BatteryCorrect;
  recoverBattery: RecoverBattery;
  damageIndicator: DamageIndicator;

  constructor(param: TDPlayerField) {
    this.playerId = param.playerId;
    this.hitMark = param.hitMark;
    this.armdozerEffects = param.armdozerEffects;
    this.batteryNumber = param.batteryNumber;
    this.batteryCorrect = param.batteryCorrect;
    this.recoverBattery = param.recoverBattery;
    this.damageIndicator = param.damageIndicator;
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.batteryNumber.destructor();
    this.batteryCorrect.destructor();
    this.damageIndicator.destructor();
    this.hitMark.shockWave.destructor();
    this.hitMark.lightning.destructor();
    this.armdozerEffects.powerUp.destructor();
    this.armdozerEffects.reflect.destructor();
    this.armdozerEffects.continuousAttack.destructor();
    this.armdozerEffects.damageHalved.destructor();
    this.armdozerEffects.batteryEnchantment.destructor();
    this.recoverBattery.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): THREE.Object3D[] {
    return [
      this.hitMark.shockWave.getObject3D(),
      this.hitMark.lightning.getObject3D(),
      this.armdozerEffects.powerUp.getObject3D(),
      this.armdozerEffects.reflect.getObject3D(),
      this.armdozerEffects.continuousAttack.getObject3D(),
      this.armdozerEffects.damageHalved.getObject3D(),
      this.armdozerEffects.batteryEnchantment.getObject3D(),
      this.batteryNumber.getObject3D(),
      this.batteryCorrect.getObject3D(),
      this.recoverBattery.getObject3D(),
      this.damageIndicator.getObject3D(),
    ];
  }
}

/**
 * プレイヤー側の3Dプレイヤーオブジェクト
 * @param params プレイヤーオブジェクト生成パラメータ
 * @return 3Dプレイヤーオブジェクト
 */
export function playerTDObjects(params: GenerateTDLayerObjectParams): TDPlayer {
  const { resources, player, gameObjectAction } = params;
  return new TDPlayerImpl({
    playerId: player.playerId,
    hitMark: {
      shockWave: playerShockWave(resources, gameObjectAction),
      lightning: playerLightning(resources, gameObjectAction),
    },
    armdozerEffects: {
      powerUp: playerPowerUp(resources, gameObjectAction),
      reflect: playerReflectIndicator(resources, gameObjectAction),
      continuousAttack: playerContinuousAttack(resources, gameObjectAction),
      damageHalved: playerDamageHalved(resources, gameObjectAction),
      batteryEnchantment: playerBatteryEnchantment(resources, gameObjectAction),
    },
    batteryNumber: playerBatteryNumber(resources, gameObjectAction),
    batteryCorrect: playerBatteryCorrect(resources, gameObjectAction),
    recoverBattery: playerRecoverBattery(resources, gameObjectAction),
    damageIndicator: playerDamageIndicator(resources, gameObjectAction),
  });
}

/**
 * 敵側の3Dプレイヤーオブジェクト
 * @param params プレイヤーオブジェクト生成パラメータ
 * @return 3Dプレイヤーオブジェクト
 */
export function enemyTDObject(params: GenerateTDLayerObjectParams): TDPlayer {
  const { resources, enemy, gameObjectAction } = params;
  return new TDPlayerImpl({
    playerId: enemy.playerId,
    hitMark: {
      shockWave: enemyShockWave(resources, gameObjectAction),
      lightning: enemyLightning(resources, gameObjectAction),
    },
    armdozerEffects: {
      powerUp: enemyPowerUp(resources, gameObjectAction),
      reflect: enemyReflectIndicator(resources, gameObjectAction),
      continuousAttack: enemyContinuousAttack(resources, gameObjectAction),
      damageHalved: enemyDamageHalved(resources, gameObjectAction),
      batteryEnchantment: enemyBatteryEnchantment(resources, gameObjectAction),
    },
    batteryNumber: enemyBatteryNumber(resources, gameObjectAction),
    batteryCorrect: enemyBatteryCorrect(resources, gameObjectAction),
    recoverBattery: enemyRecoverBattery(resources, gameObjectAction),
    damageIndicator: enemyDamageIndicator(resources, gameObjectAction),
  });
}
