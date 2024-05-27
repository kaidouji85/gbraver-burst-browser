import { BattleSimulator } from "../../dom-dialogs/battle-simulator";
import { DomDialogActionConnector } from "../dom-dialog-binder/dom-dialog-action-connector";

/** 戦闘シミュレーターとゲームアクションを関連付ける */
export const battleSimulatorConnector: DomDialogActionConnector<
  BattleSimulator
> = (dialog, gameAction) => [
  dialog.notifyClose().subscribe(() => {
    gameAction.next({ type: "BattleSimulatorEnd" });
  }),
];
