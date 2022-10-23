// @flow
import type { StreamSource } from "../../../stream/stream";
import { BattleScene } from "../../../td-scenes/battle";
import type { GameAction } from "../../game-actions";
import type { TDSceneActionConnector } from "./td-scene-action-connector";

/** 戦闘シーンとゲームアクションを関連付ける */
export const battleSceneConnector: TDSceneActionConnector<BattleScene> = (
  scene: BattleScene,
  gameAction: StreamSource<GameAction>
) => [
  scene.gameEndNotifier().subscribe((v) => {
    gameAction.next({
      type: "EndBattle",
      gameEnd: v.gameEnd,
      animationTimeScale: v.animationTimeScale,
    });
  }),
];
