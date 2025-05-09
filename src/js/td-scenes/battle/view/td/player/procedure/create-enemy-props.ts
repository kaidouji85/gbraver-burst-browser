import { enemyBatteryCorrect } from "../../../../../../game-object/battery-correct";
import { enemyBatteryEnhancement } from "../../../../../../game-object/battery-enhancement";
import { enemyBatteryNumber } from "../../../../../../game-object/battery-number";
import { enemyContinuousAttack } from "../../../../../../game-object/continuous-attack";
import { enemyDamageHalved } from "../../../../../../game-object/damage-halved";
import { enemyDamageIndicator } from "../../../../../../game-object/damage-indicator";
import { enemyEffectClear } from "../../../../../../game-object/effect-clear";
import { enemyLightning } from "../../../../../../game-object/hitmark/lightning";
import { enemyShockWave } from "../../../../../../game-object/hitmark/shock-wave";
import { enemyPowerUp } from "../../../../../../game-object/power-up";
import { enemyRecoverBattery } from "../../../../../../game-object/recover-battery";
import { enemyReflectIndicator } from "../../../../../../game-object/reflect-indicator";
import { TDLayerObjectCreatorParams } from "../../creator-params";
import { TDPlayerProps } from "../props";

/**
 * 敵側のTDPlayerPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createEnemyProps(
  params: TDLayerObjectCreatorParams,
): TDPlayerProps {
  const { resources, enemy, gameObjectAction } = params;
  return {
    playerId: enemy.playerId,
    hitMark: {
      shockWave: enemyShockWave(params),
      lightning: enemyLightning(params),
    },
    armdozerEffects: {
      powerUp: enemyPowerUp(params),
      reflect: enemyReflectIndicator(resources, gameObjectAction),
      continuousAttack: enemyContinuousAttack(params),
      damageHalved: enemyDamageHalved(params),
      batteryEnhancement: enemyBatteryEnhancement(params),
      effectClear: enemyEffectClear(params),
    },
    batteryNumber: enemyBatteryNumber(params),
    batteryCorrect: enemyBatteryCorrect(params),
    recoverBattery: enemyRecoverBattery(params),
    damageIndicator: enemyDamageIndicator(params),
  };
}
