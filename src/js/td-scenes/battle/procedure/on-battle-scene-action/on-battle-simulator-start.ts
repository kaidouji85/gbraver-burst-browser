import { BattleSceneProps } from "../../props";
import { openBattleSimulator } from "../open-battle-simulator";

/**
 * バトルシミュレータ開始時の処理
 * @param props 戦闘シーンプロパティ
 */
export function onBattleSimulatorStart(props: BattleSceneProps) {
  const { exclusive, se, sounds } = props;
  exclusive.execute(async () => {
    se.play(sounds.changeValue);
    await props.customBattleEvent?.onBattleSimulatorSelected(props);
    openBattleSimulator(props);
  });
}
