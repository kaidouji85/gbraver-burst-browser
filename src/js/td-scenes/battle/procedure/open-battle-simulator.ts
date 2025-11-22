import { BattleSimulator } from "../../../dom-dialogs/battle-simulator";
import { BattleSceneProps } from "../props";
import { switchBattleSimulator } from "./switch-battle-simulator";

/**
 * バトルシミュレーターを開く
 * @param props 戦闘シーンプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export function openBattleSimulator(props: Readonly<BattleSceneProps>): void {
  const { view, playerId, stateHistory } = props;
  const lastState = stateHistory.at(-1);
  if (!lastState) {
    return;
  }

  const player = lastState.players.find((p) => p.playerId === playerId);
  const enemy = lastState.players.find((p) => p.playerId !== playerId);
  if (!player || !enemy) {
    return;
  }

  const isPlayerAttacker = lastState.activePlayerId === playerId;
  const initialPlayerBattery =
    view.hud.gameObjects.batterySelector.getBattery();
  const dialog = new BattleSimulator({
    ...props,
    player,
    enemy,
    initialPlayerBattery,
    isPlayerAttacker,
  });
  switchBattleSimulator(props, dialog);
}
