import { canBeatDown } from "../../../npc/can-beat-down";
import { BattleSimulatorEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { SurviveSuperPowerWithGuardProps } from "../props";

/**
 * 現在のバッテリーで敵が全力攻撃した時にプレイヤーが死亡するか否かを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueで死亡
 */
export function willPlayerDieWithCurrentBattery(
  props: Readonly<BattleSimulatorEventProps & SurviveSuperPowerWithGuardProps>,
): boolean {
  const currentBattery =
    props.view.hud.gameObjects.batterySelector.getBattery();
  const { player, enemy } = props;
  return canBeatDown(enemy, enemy.armdozer.battery, player, currentBattery);
}
