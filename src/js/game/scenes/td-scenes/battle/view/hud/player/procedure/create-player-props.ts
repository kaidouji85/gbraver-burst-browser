import { playerGauge } from "../../../../../../../game-object/gauge";
import { HUD_PREDICATED_DAMAGE_Z } from "../../../../../../../game-object/hud-position";
import { PredicatedDamage } from "../../../../../../../game-object/predicated-damage";
import { winIndicator } from "../../../../../../../game-object/result-indicator";
import { StatusIcon } from "../../../../../../../game-object/status-icon";
import { playerTurnStart } from "../../../../../../../game-object/turn-start";
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

  const predicatedDamage = new PredicatedDamage({
    ...params,
    battleSimulatorIconPosition: "left",
  });
  predicatedDamage
    .getObject3D()
    .position.set(-400, 80, HUD_PREDICATED_DAMAGE_Z);
  gauge.getObject3D().add(predicatedDamage.getObject3D());

  const statusIcon = new StatusIcon(params);

  return {
    playerId: player.playerId,
    gauge,
    predicatedDamage,
    statusIcon,
    turnStart: playerTurnStart(resources, gameObjectAction),
    resultIndicator: winIndicator(resources, gameObjectAction),
  };
}
