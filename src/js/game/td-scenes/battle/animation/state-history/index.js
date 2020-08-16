// @flow

import {Animate} from "../../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core";
import {empty} from "../../../../../animation/delay";
import {inputCommandAnimation} from "./input-command";
import {battleAnimation} from "./battle";
import {turnChangeAnimation} from "./turn-change";
import {burstAnimation} from "./burst";
import {startGameAnimation} from "./start-game";
import {batteryDeclarationAnimation} from "./battery-declaration";
import {reflectAnimation} from "./reflect";
import {updateRemainingTurnAnimation} from "./update-remaining-turn";
import {gameEndAnimation} from "./game-end";
import {rightItselfAnimation} from "./right-itself";
import {pilotAnimation} from "./pilot-skill";

/**
 * 状態に応じた戦闘シーンのアニメーションを再生する
 *
 * @param view 戦闘シーンビュー
 * @param sceneState 戦闘シーンの状態
 * @param gameStateList 再生するゲームの状態
 * @return アニメーション
 */
export function stateHistoryAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameStateList: GameState[]): Animate {
  return gameStateList
    .map(v => {
      switch (v.effect.name) {
        case 'StartGame':
          return startGameAnimation(view, sceneState, v);
        case 'InputCommand':
          return inputCommandAnimation(view, sceneState, v);
        case 'BatteryDeclaration':
          return batteryDeclarationAnimation(view, sceneState, v);
        case 'Battle':
          return battleAnimation(view, sceneState, v);
        case 'TurnChange':
          return turnChangeAnimation(view, sceneState, v);
        case 'BurstEffect':
          return burstAnimation(view, sceneState, v);
        case 'Reflect':
          return reflectAnimation(view, sceneState, v);
        case 'UpdateRemainingTurn':
          return updateRemainingTurnAnimation(view, sceneState, v);
        case 'GameEnd':
          return gameEndAnimation(view, sceneState, v);
        case 'RightItself':
          return rightItselfAnimation(view, sceneState, v);
        case 'PilotSkillEffect':
          return pilotAnimation(view, sceneState, v);
        default:
          return empty();
      }
    })
    .reduce((a, b) => a.chain(b), empty());
}