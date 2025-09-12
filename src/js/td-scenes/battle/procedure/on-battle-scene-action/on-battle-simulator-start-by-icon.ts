import { BattleSceneProps } from "../../props";
import { openBattleSimulator } from "../open-battle-simulator";

/**
 * アイコン押下によりバトルシミュレーターを開始した時の処理
 * @param props 戦闘シーンプロパティ
 */
export function onBattleSimulatorStartByIcon(
  props: Readonly<BattleSceneProps>,
) {
  const { exclusive, view, stateHistory } = props;
  exclusive.execute(async () => {
    const lastState = stateHistory.at(-1);
    if (!lastState) {
      return;
    }

    const predicatedDamage = view.hud.players.find(
      (p) => p.playerId !== lastState.activePlayerId,
    )?.predicatedDamage;
    if (!predicatedDamage) {
      return;
    }

    await predicatedDamage.popBattleSimulatorIcon().play();
    openBattleSimulator(props);
  });
}
