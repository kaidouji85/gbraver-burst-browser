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
import type {BatteryDeclaration} from "gbraver-burst-core/lib/effect/battery-declaration/battery-declaration";
import type {Battle} from "gbraver-burst-core/lib/effect/battle/battle";
import type {TurnChange} from "gbraver-burst-core/lib/effect/turn-change/turn-change";
import type {BurstEffect} from "gbraver-burst-core/lib/effect/burst/burst-effect";
import type {Reflect} from "gbraver-burst-core/lib/effect/reflect/reflect";
import type {UpdateRemainingTurn} from "gbraver-burst-core/lib/effect/update-remaning-turn/update-remaining-turn";
import type {GameEnd} from "gbraver-burst-core/lib/effect/game-end/game-end";

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

      if (v.effect.name === 'BatteryDeclaration') {
        const effect: BatteryDeclaration = v.effect;
        const state = ((v: any): GameStateX<typeof effect>);
        return batteryDeclarationAnimation(view, sounds, sceneState, state);
      }

      if (v.effect.name === 'Battle') {
        const effect: Battle = v.effect;
        const state = ((v: any): GameStateX<typeof effect>);
        return battleAnimation(view, sceneState, state);
      }

      if (v.effect.name === 'TurnChange') {
        const effect: TurnChange = v.effect;
        const state = ((v: any): GameStateX<typeof effect>);
        return turnChangeAnimation(view, sceneState, state);
      }

      if (v.effect.name === 'BurstEffect') {
        const effect: BurstEffect = v.effect;
        const state = ((v: any): GameStateX<typeof effect>);
        return burstAnimation(view, sceneState, state);
      }

      if (v.effect.name === 'Reflect') {
        const effect: Reflect = v.effect;
        const state = ((v: any): GameStateX<typeof effect>);
        return reflectAnimation(view, sceneState, state);
      }

      if (v.effect.name === 'UpdateRemainingTurn') {
        const effect: UpdateRemainingTurn = v.effect;
        const state = ((v: any): GameStateX<typeof effect>);
        return updateRemainingTurnAnimation(view, sceneState, state);
      }

      if (v.effect.name === 'GameEnd') {
        const effect: GameEnd = v.effect;
        const state = ((v: any): GameStateX<typeof effect>);
        return gameEndAnimation(view, sceneState, state);
      }

      switch (v.effect.name) {
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