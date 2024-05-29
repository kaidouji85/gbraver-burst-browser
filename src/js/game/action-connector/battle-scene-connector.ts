import { map } from "rxjs";

import { ActionManager } from "../../action-manager/action-manager";
import { BattleScene } from "../../td-scenes/battle";
import { TDSceneActionConnector } from "../../td-scenes/td-scene-binder/action-connector";
import { GameAction } from "../game-actions";

/** 戦闘シーンとゲームアクションを関連付ける */
export const battleSceneConnector =
  (
    gameAction: ActionManager<GameAction>,
  ): TDSceneActionConnector<BattleScene> =>
  (scene: BattleScene) =>
    gameAction.connect([
      scene
        .notifyGameEnd()
        .pipe(map((a) => ({ ...a, type: "EndBattle" }) as const)),
      scene
        .notifyBattleSimulate()
        .pipe(map((a) => ({ ...a, type: "BattleSimulatorStart" }) as const)),
    ]);
