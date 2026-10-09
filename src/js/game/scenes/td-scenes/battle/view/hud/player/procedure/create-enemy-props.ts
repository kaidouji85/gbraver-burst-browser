import { enemyGauge } from "../../../../../../../game-object/gauge";
import { HUD_PREDICATED_DAMAGE_Z } from "../../../../../../../game-object/hud-position";
import { PredicatedDamage } from "../../../../../../../game-object/predicated-damage";
import { loseIndicator } from "../../../../../../../game-object/result-indicator";
import { StatusIcon } from "../../../../../../../game-object/status-icon";
import { enemyTurnStart } from "../../../../../../../game-object/turn-start";
import { HUDLayerObjectCreatorParams } from "../../creator-params";
import { HUDPlayerProps } from "../props";

/**
 * 敵側のHUDPlayerPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createEnemyProps(
  params: HUDLayerObjectCreatorParams,
): HUDPlayerProps {
  const { resources, enemy, gameObjectAction } = params;

  const gauge = enemyGauge({
    ...params,
    hp: enemy.armdozer.maxHp,
    battery: enemy.armdozer.maxBattery,
  });

  const predicatedDamage = new PredicatedDamage({
    ...params,
    battleSimulatorIconPosition: "right",
  });
  predicatedDamage.getObject3D().position.set(400, 80, HUD_PREDICATED_DAMAGE_Z);
  gauge.getObject3D().add(predicatedDamage.getObject3D());

  const statusIcon = new StatusIcon(params);

  return {
    playerId: enemy.playerId,
    gauge,
    predicatedDamage,
    statusIcon,
    turnStart: enemyTurnStart(resources, gameObjectAction),
    resultIndicator: loseIndicator(resources, gameObjectAction),
  };
}
