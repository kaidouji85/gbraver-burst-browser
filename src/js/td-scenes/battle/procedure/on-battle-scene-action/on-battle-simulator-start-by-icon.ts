import { BattleSceneProps } from "../../props";
import { openBattleSimulator } from "../open-battle-simulator";

/**
 * アイコン押下によりバトルシミュレーターを開始した時の処理
 * @param props 戦闘シーンプロパティ
 */
export function onBattleSimulatorStartByIcon(
  props: Readonly<BattleSceneProps>,
) {
  const { exclusive } = props;
  exclusive.execute(async () => {
    openBattleSimulator(props);
  });
}
