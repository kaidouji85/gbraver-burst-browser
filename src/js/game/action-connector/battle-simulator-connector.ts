import { map } from "rxjs";

import { ActionManager } from "../../action-manager/action-manager";
import { BattleSimulator } from "../../dom-dialogs/battle-simulator";
import { DomDialogActionConnector } from "../../dom-dialogs/dom-dialog-binder/action-connector";
import { GameAction } from "../game-actions";

/** 
 * 戦闘シミュレーターのアクションコネクタを生成する
 * @param gameAction アクション管理オブジェクト
 * @returns アクションコネクタ
 */
export const battleSimulatorConnector =
  (
    gameAction: ActionManager<GameAction>,
  ): DomDialogActionConnector<BattleSimulator> =>
  (dialog) =>
    gameAction.connect([
      dialog.notifyClose().pipe(
        map(() => ({ type: "BattleSimulatorEnd" }))
      )    
    ]);
    
