// @flow

import {Animate} from "../../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameState, GameStateX} from "gbraver-burst-core";
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
import {pilotSkillAnimation} from "./pilot-skill";
import {BattleSceneSounds} from "../../sounds";
import type {StartGame} from "gbraver-burst-core/lib/effect/start-game/start-game";
import type {InputCommand} from "gbraver-burst-core/lib/effect/input-command/input-command";

/**
 * 状態に応じた戦闘シーンのアニメーションを再生する
 *
 * @param view 戦闘シーンビュー
 * @param sounds 戦闘シーン効果音
 * @param sceneState 戦闘シーンの状態
 * @param gameStateList 再生するゲームの状態
 * @return アニメーション
 */
export function stateHistoryAnimation(view: BattleSceneView, sounds: BattleSceneSounds, sceneState: BattleSceneState, gameStateList: GameState[]): Animate {
  return gameStateList
    .map(v => {
      if (v.effect.name === 'StartGame') {
        const effect: StartGame = v.effect;
        const state = ((v: any): GameStateX<typeof effect>);
        return startGameAnimation(view, sceneState, state);
      }

      if (v.effect.name === 'InputCommand') {
        const effect: InputCommand = v.effect;
        const state = ((v: any): GameStateX<typeof effect>);
        return inputCommandAnimation(view, sceneState, state);
      }

      switch (v.effect.name) {
        case 'BatteryDeclaration':
          return batteryDeclarationAnimation(view, sounds, sceneState, v);
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
          return pilotSkillAnimation(view, sceneState, v);
        default:
          return empty();
      }
    })
    .reduce((a, b) => a.chain(b), empty());
}