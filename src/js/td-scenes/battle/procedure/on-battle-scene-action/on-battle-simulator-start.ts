import { BattleSimulator } from "../../../../dom-dialogs/battle-simulator";
import { BattleSceneProps } from "../../props";
import { getBattleSimulatorGameState } from "../get-battle-simulator-game-state";
import { switchBattleSimulator } from "../switch-battle-simulator";

/**
 * バトルシミュレータ開始時の処理
 * @param props 戦闘シーンプロパティ
 */
export function onBattleSimulatorStart(props: BattleSceneProps) {
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
