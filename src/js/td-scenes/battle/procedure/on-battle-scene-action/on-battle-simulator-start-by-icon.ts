import { BattleSimulatorStartByIcon } from "../../actions/battle-simulator-start-by-icon";
import { BattleSceneProps } from "../../props";
import { createBattleSimulatorEventProps } from "../create-battle-simulator-event-props";
import { openBattleSimulator } from "../open-battle-simulator";

/**
 * アイコン押下によりバトルシミュレーターを開始した時の処理
 * @param props 戦闘シーンプロパティ
 */
export function onBattleSimulatorStartByIcon(
  props: Readonly<BattleSceneProps>,
  action: BattleSimulatorStartByIcon,
) {
  const { exclusive, view } = props;
  exclusive.execute(async () => {
    const predicatedDamage = view.hud.players.find(
      (p) => p.playerId === action.playerId,
    )?.predicatedDamage;
    if (!predicatedDamage) {
      return;
    }

    await predicatedDamage.popBattleSimulatorIcon().play();
    const eventProps = createBattleSimulatorEventProps(props);
    if (eventProps && props.customBattleEvent) {
      await props.customBattleEvent.onBattleSimulatorSelected(
        eventProps,
      );
    }
    openBattleSimulator(props);
  });
}
