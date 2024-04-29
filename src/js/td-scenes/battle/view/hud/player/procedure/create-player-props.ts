import { playerGauge } from "../../../../../../game-object/gauge";
import { PredicatedDamage } from "../../../../../../game-object/predicated-damage";
import { winIndicator } from "../../../../../../game-object/result-indicator";
import { playerTurnStart } from "../../../../../../game-object/turn-start";
import { HUDLayerObjectCreatorParams } from "../../creator-params";
import { HUDPlayerProps } from "../props";

/**
 * プレイヤー側のHUDPlayerPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createPlayerProps(
  params: HUDLayerObjectCreatorParams,
): HUDPlayerProps {
  const { resources, player, gameObjectAction } = params;

  const gauge = playerGauge({
    ...params,
    hp: player.armdozer.maxHp,
    battery: player.armdozer.maxBattery,
  });

  const predicatedDamage = new PredicatedDamage(params);
  predicatedDamage.getObject3D().position.x = -150;
  predicatedDamage.getObject3D().position.y = 70;
  gauge.addObject3D(predicatedDamage.getObject3D());

  return {
    playerId: player.playerId,
    gauge,
    predicatedDamage,
    turnStart: playerTurnStart(resources, gameObjectAction),
    resultIndicator: winIndicator(resources, gameObjectAction),
  };
}
