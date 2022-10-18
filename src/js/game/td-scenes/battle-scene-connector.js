// @flow
import type {StreamSource} from "../../stream/stream";
import type {GameAction} from "../game-actions";
import {BattleScene} from "../../td-scenes/battle";
import type {GameActionConnector} from "./index";

/** 戦闘シーンとゲームアクションを関連付ける */
export const battleSceneConnector: GameActionConnector<BattleScene> = (scene: BattleScene, gameAction: StreamSource<GameAction>) => [
  scene.gameEndNotifier().subscribe(v => {
    gameAction.next({type: 'EndBattle', gameEnd: v.gameEnd, animationTimeScale: v.animationTimeScale});
  })
];