import { map } from "rxjs";

import { ActionManager } from "../../../action-manager/action-manager";
import { BattleSimulator } from "../../../dom-dialogs/battle-simulator";
import { DomDialogActionConnector } from "../../../dom-dialogs/dom-dialog-binder/action-connector";
import { BattleSceneAction } from "../actions";

/**
 * 戦闘シミュレーションダイアログのアクションコネクタを生成する
 * @param battleSceneAction アクション管理オブジェクト
 * @returns アクションコネクタ
 */
export const battleSimulatorConnector =
  (
    battleSceneAction: ActionManager<BattleSceneAction>,
  ): DomDialogActionConnector<BattleSimulator> =>
  (dialog) =>
    battleSceneAction.connect([
      dialog.notifyClose().pipe(map(() => ({ type: "battleSimulatorEnd" }))),
    ]);
