// @flow

import {Animate} from "../../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {
  BatteryDeclaration,
  Battle,
  BurstEffect,
  GameEnd,
  GameState,
  GameStateX,
  InputCommand,
  PilotSkillEffect,
  Reflect,
  RightItself,
  StartGame,
  TurnChange,
  UpdateRemainingTurn
} from "gbraver-burst-core";
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
import {BattleSceneSounds} from "../../sounds/sounds";

/**
 * 同時再生する効果
 * 以下効果が連続した場合、アニメーションは並列再生される
 */
const parallelPlayEffects = ['TurnChange', 'RightItself', 'UpdateRemainingTurn',];

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
    .map((state, index) => {
      const next = gameStateList[index + 1];
      const isParallel = next && parallelPlayEffects.includes(next.effect.name)
        && parallelPlayEffects.includes(state.effect.name);
      const anime = stateAnimation(state, view, sounds, sceneState);
      return {anime, isParallel};
    })
    .reduce((previous, current) =>
      current.isParallel ? previous.chain(empty(), current.anime) : previous.chain(current.anime), empty());
}

/**
 * ゲームステートをアニメーションに変換する
 *
 * @param currentState 変換対象のゲーム ステート
 * @param view 戦闘シーンビュー
 * @param sounds 戦闘シーン効果音
 * @param sceneState 戦闘シーンの状態
 * @return アニメーション
 */
export function stateAnimation(currentState: GameState, view: BattleSceneView, sounds: BattleSceneSounds, sceneState: BattleSceneState): Animate {
  if (currentState.effect.name === 'StartGame') {
    const effect: StartGame = currentState.effect;
    const state = ((currentState: any): GameStateX<typeof effect>);
    return startGameAnimation(view, sceneState, sounds, state);
  }

  if (currentState.effect.name === 'InputCommand') {
    const effect: InputCommand = currentState.effect;
    const state = ((currentState: any): GameStateX<typeof effect>);
    return inputCommandAnimation(view, sceneState, state);
  }

  if (currentState.effect.name === 'BatteryDeclaration') {
    const effect: BatteryDeclaration = currentState.effect;
    const state = ((currentState: any): GameStateX<typeof effect>);
    return batteryDeclarationAnimation(view, sounds, sceneState, state);
  }

  if (currentState.effect.name === 'Battle') {
    const effect: Battle = currentState.effect;
    const state = ((currentState: any): GameStateX<typeof effect>);
    return battleAnimation(view, sceneState, state);
  }

  if (currentState.effect.name === 'TurnChange') {
    const effect: TurnChange = currentState.effect;
    const state = ((currentState: any): GameStateX<typeof effect>);
    return turnChangeAnimation(view, sceneState, sounds, state);
  }

  if (currentState.effect.name === 'BurstEffect') {
    const effect: BurstEffect = currentState.effect;
    const state = ((currentState: any): GameStateX<typeof effect>);
    return burstAnimation(view, sceneState, state);
  }

  if (currentState.effect.name === 'Reflect') {
    const effect: Reflect = currentState.effect;
    const state = ((currentState: any): GameStateX<typeof effect>);
    return reflectAnimation(view, sceneState, state);
  }

  if (currentState.effect.name === 'UpdateRemainingTurn') {
    const effect: UpdateRemainingTurn = currentState.effect;
    const state = ((currentState: any): GameStateX<typeof effect>);
    return updateRemainingTurnAnimation(view, sceneState, state);
  }

  if (currentState.effect.name === 'GameEnd') {
    const effect: GameEnd = currentState.effect;
    const state = ((currentState: any): GameStateX<typeof effect>);
    return gameEndAnimation(view, sceneState, state);
  }

  if (currentState.effect.name === 'RightItself') {
    const effect: RightItself = currentState.effect;
    const state = ((currentState: any): GameStateX<typeof effect>);
    return rightItselfAnimation(view, sceneState, state);
  }

  if (currentState.effect.name === 'PilotSkillEffect') {
    const effect: PilotSkillEffect = currentState.effect;
    const state = ((currentState: any): GameStateX<typeof effect>);
    return pilotSkillAnimation(view, sceneState, state);
  }

  return empty();
}