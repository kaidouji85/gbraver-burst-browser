import { BattleSimulator } from "../../../../dom-dialogs/battle-simulator";
import { BattleSceneProps } from "../../props";
import { getBattleSimulatorGameState } from "../get-battle-simulator-game-state";
import { switchBattleSimulator } from "../switch-battle-simulator";

/**
 * アイコン押下によりバトルシミュレーターを開始した時の処理
 * @param props 戦闘シーンプロパティ
 */
export function onBattleSimulatorStartByIcon(
  props: Readonly<BattleSceneProps>,
) {
  const { exclusive, se, sounds } = props;
  exclusive.execute(async () => {
    const battleSimulatorGameState = getBattleSimulatorGameState(props);
    if (!battleSimulatorGameState) {
      return;
    }

    se.play(sounds.changeValue);
    const dialog = new BattleSimulator({
      ...props,
      ...battleSimulatorGameState,
    });
    switchBattleSimulator(props, dialog);
  });
}
