import { BattleSimulator } from "../../dom-dialogs/battle-simulator";
import { battleSimulatorConnector } from "../action-connector/battle-simulator-connector";
import { BattleSimulatorStart } from "../game-actions/battle-simulator-start";
import { GameProps } from "../game-props";

/**
 * 戦闘シミュレーター開始時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onBattleSimulatorStart(
  props: GameProps,
  action: BattleSimulatorStart,
) {
  const { domDialogBinder } = props;
  domDialogBinder.bind(
    new BattleSimulator({
      ...props,
      ...action,
    }),
    battleSimulatorConnector,
  );
}
