import { BattleSimulator } from "../../dom-dialogs/battle-simulator";
import { DomDialogActionConnector } from "../../dom-dialogs/dom-dialog-binder/action-connector";

/** 戦闘シミュレーターとゲームアクションを関連付ける */
export const battleSimulatorConnector: DomDialogActionConnector<
  BattleSimulator
> = (dialog, gameAction) => [
  dialog.notifyClose().subscribe(() => {
    gameAction.next({ type: "BattleSimulatorEnd" });
  }),
];
