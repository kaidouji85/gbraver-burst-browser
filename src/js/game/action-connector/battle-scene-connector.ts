import { Subject } from "rxjs";

import { TDSceneActionConnector } from "../../binder/td-scene-binder/td-scene-action-connector";
import { BattleScene } from "../../td-scenes/battle";
import { GameAction } from "../game-actions";

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
