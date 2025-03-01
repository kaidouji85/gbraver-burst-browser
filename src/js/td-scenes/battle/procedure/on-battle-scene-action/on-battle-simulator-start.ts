import { BattleSimulator } from "../../../../dom-dialogs/battle-simulator";
import { BattleSceneProps } from "../../props";
import { switchBattleSimulator } from "../switch-battle-simulator";

/**
 * バトルシミュレータ開始時の処理
 * @param props 戦闘シーンプロパティ
 */
export function onBattleSimulatorStart(props: BattleSceneProps) {
  const { view, exclusive, playerId, stateHistory, sounds, se } = props;
  exclusive.execute(async () => {
    const lastState = stateHistory.at(-1);
    if (!lastState) {
      return;
    }

    const player = lastState.players.find((p) => p.playerId === playerId);
    const enemy = lastState.players.find((p) => p.playerId !== playerId);
    if (!player || !enemy) {
      return;
    }

    se.play(sounds.changeValue);
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
  });
}
