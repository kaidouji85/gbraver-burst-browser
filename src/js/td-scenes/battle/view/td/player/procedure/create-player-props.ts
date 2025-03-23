import { playerBatteryCorrect } from "../../../../../../game-object/battery-correct";
import { playerBatteryEnhancement } from "../../../../../../game-object/battery-enhancement";
import { playerBatteryNumber } from "../../../../../../game-object/battery-number";
import { playerContinuousAttack } from "../../../../../../game-object/continuous-attack";
import { playerDamageHalved } from "../../../../../../game-object/damage-halved";
import { playerDamageIndicator } from "../../../../../../game-object/damage-indicator";
import { playerLightning } from "../../../../../../game-object/hitmark/lightning";
import { playerShockWave } from "../../../../../../game-object/hitmark/shock-wave";
import { playerIneffective } from "../../../../../../game-object/ineffective";
import { playerPowerUp } from "../../../../../../game-object/power-up";
import { playerRecoverBattery } from "../../../../../../game-object/recover-battery";
import { playerReflectIndicator } from "../../../../../../game-object/reflect-indicator";
import { TDLayerObjectCreatorParams } from "../../creator-params";
import { TDPlayerProps } from "../props";

/**
 * プレイヤー側のTDPlayerPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createPlayerProps(
  params: TDLayerObjectCreatorParams,
): TDPlayerProps {
  const { resources, player, gameObjectAction } = params;
  return {
    playerId: player.playerId,
    hitMark: {
      shockWave: playerShockWave(params),
      lightning: playerLightning(params),
    },
    armdozerEffects: {
      powerUp: playerPowerUp(params),
      reflect: playerReflectIndicator(resources, gameObjectAction),
      continuousAttack: playerContinuousAttack(params),
      damageHalved: playerDamageHalved(params),
      batteryEnhancement: playerBatteryEnhancement(params),
      ineffective: playerIneffective(params),
    },
    batteryNumber: playerBatteryNumber(params),
    batteryCorrect: playerBatteryCorrect(params),
    recoverBattery: playerRecoverBattery(params),
    damageIndicator: playerDamageIndicator(params),
  };
}
