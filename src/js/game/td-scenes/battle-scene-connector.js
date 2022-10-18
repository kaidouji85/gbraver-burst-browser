// @flow
import {BattleScene} from "./battle";
import type {GameActionConnector} from "./index";

/** 戦闘シーンとゲームアクションを関連付ける */
export const battleSceneConnector: GameActionConnector<BattleScene> = (scene, gameAction) => [
  scene.gameEndNotifier().subscribe(v => {
    gameAction.next({type: 'EndBattle', gameEnd: v.gameEnd, animationTimeScale: v.animationTimeScale});
  })
];