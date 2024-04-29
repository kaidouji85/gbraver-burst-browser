import { enemyGauge } from "../../../../../../game-object/gauge";
import { PredicatedDamage } from "../../../../../../game-object/predicated-damage";
import { loseIndicator } from "../../../../../../game-object/result-indicator";
import { enemyTurnStart } from "../../../../../../game-object/turn-start";
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

  const predicatedDamage = new PredicatedDamage(params);
  predicatedDamage.getObject3D().position.x = 250;
  predicatedDamage.getObject3D().position.y = 70;
  gauge.addObject3D(predicatedDamage.getObject3D());

  return {
    playerId: enemy.playerId,
    gauge,
    predicatedDamage,
    turnStart: enemyTurnStart(resources, gameObjectAction),
    resultIndicator: loseIndicator(resources, gameObjectAction),
  };
}
