import { Subject } from "rxjs";

import { BattleScene } from "../../td-scenes/battle";
import type { GameAction } from "../game-actions";
import type { TDSceneActionConnector } from "../td-scene-binder/td-scene-action-connector";

/** 戦闘シーンとゲームアクションを関連付ける */
export const battleSceneConnector: TDSceneActionConnector<BattleScene> = (
  scene: BattleScene,
  gameAction: Subject<GameAction>,
) => [
  scene.notifyGameEnd().subscribe((v) => {
    gameAction.next({
      type: "EndBattle",
      gameEnd: v.gameEnd,
      animationTimeScale: v.animationTimeScale,
    });
  }),
];
