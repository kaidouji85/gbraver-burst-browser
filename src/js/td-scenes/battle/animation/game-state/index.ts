import type {
  BatteryDeclaration,
  Battle,
  BurstEffect,
  GameEnd,
  GameState,
  InputCommand,
  PilotSkillEffect,
  Reflect,
  RightItself,
  StartGame,
  TurnChange,
  UpdateRemainingTurn,
} from "gbraver-burst-core";

import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { batteryDeclarationAnimation } from "./battery-declaration";
import { battleAnimation } from "./battle";
import { burstAnimation } from "./burst";
import { gameEndAnimation } from "./game-end";
import { inputCommandAnimation } from "./input-command";
import { pilotSkillAnimation } from "./pilot-skill";
import { reflectAnimation } from "./reflect";
import { rightItselfAnimation } from "./right-itself";
import { startGameAnimation } from "./start-game";
import type { StateAnimationProps } from "./state-animation-props";
import { turnChangeAnimation } from "./turn-change";
import { updateRemainingTurnAnimation } from "./update-remaining-turn";

/**
 * 同時再生する効果
 * 以下効果が連続した場合、アニメーションは並列再生される
 */
const parallelPlayEffects = [
  "TurnChange",
  "RightItself",
  "UpdateRemainingTurn",
];

/**
 * @deprecated
 * ゲームステート履歴を戦闘アニメーションに変換する
 *
 * @param props 戦闘シーンプロパティ
 * @param gameStateHistory 変換対象のゲームステートヒストリー
 * @return アニメーション
 */
export function stateHistoryAnimation(
  props: StateAnimationProps,
  gameStateHistory: GameState[]
): Animate {
  return gameStateHistory
    .map((gameState, index) => {
      const next = gameStateHistory[index + 1];
      const isParallel =
        next &&
        parallelPlayEffects.includes(next.effect.name) &&
        parallelPlayEffects.includes(gameState.effect.name);
      const anime = stateAnimation(props, gameState);
      return {
        anime,
        isParallel,
      };
    })
    .reduce(
      (previous, current) =>
        current.isParallel
          ? previous.chain(empty(), current.anime)
          : previous.chain(current.anime),
      empty()
    );
}

/**
 * ゲームステートを戦闘アニメーションに変換する
 *
 * @param props 戦闘シーンプロパティ
 * @param gameState 変換対象のゲームステート
 * @return アニメーション
 */
export function stateAnimation(
  props: StateAnimationProps,
  gameState: GameState
): Animate {
  if (gameState.effect.name === "StartGame") {
    const effect: StartGame = gameState.effect;
    return startGameAnimation(props, { ...gameState, effect });
  }

  if (gameState.effect.name === "InputCommand") {
    const effect: InputCommand = gameState.effect;
    return inputCommandAnimation(props, { ...gameState, effect });
  }

  if (gameState.effect.name === "BatteryDeclaration") {
    const effect: BatteryDeclaration = gameState.effect;
    return batteryDeclarationAnimation(props, { ...gameState, effect });
  }

  if (gameState.effect.name === "Battle") {
    const effect: Battle = gameState.effect;
    return battleAnimation(props, { ...gameState, effect });
  }

  if (gameState.effect.name === "TurnChange") {
    const effect: TurnChange = gameState.effect;
    return turnChangeAnimation(props, { ...gameState, effect });
  }

  if (gameState.effect.name === "BurstEffect") {
    const effect: BurstEffect = gameState.effect;
    return burstAnimation(props, { ...gameState, effect });
  }

  if (gameState.effect.name === "Reflect") {
    const effect: Reflect = gameState.effect;
    return reflectAnimation(props, { ...gameState, effect });
  }

  if (gameState.effect.name === "UpdateRemainingTurn") {
    const effect: UpdateRemainingTurn = gameState.effect;
    return updateRemainingTurnAnimation(props, { ...gameState, effect });
  }

  if (gameState.effect.name === "GameEnd") {
    const effect: GameEnd = gameState.effect;
    return gameEndAnimation(props, { ...gameState, effect });
  }

  if (gameState.effect.name === "RightItself") {
    const effect: RightItself = gameState.effect;
    return rightItselfAnimation(props, { ...gameState, effect });
  }

  if (gameState.effect.name === "PilotSkillEffect") {
    const effect: PilotSkillEffect = gameState.effect;
    return pilotSkillAnimation(props, { ...gameState, effect });
  }

  return empty();
}
