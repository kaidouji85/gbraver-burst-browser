import { Subject } from "rxjs";

import { BattleScene } from "../../td-scenes/battle";
import { GameAction } from "../game-actions";
import { TDSceneActionConnector } from "../td-scene-binder/td-scene-action-connector";

/** 戦闘シーンとゲームアクションを関連付ける */
export const battleSceneConnector: TDSceneActionConnector<BattleScene> = (
  scene: BattleScene,
  gameAction: Subject<GameAction>,
) => [
  scene.notifyGameEnd().subscribe((n) => {
    gameAction.next({
      ...n,
      type: "EndBattle",
    });
  }),
  scene.notifyBattleSimulate().subscribe((n) => {
    gameAction.next({
      ...n,
      type: "BattleSimulatorStart",
    });
  }),
];
