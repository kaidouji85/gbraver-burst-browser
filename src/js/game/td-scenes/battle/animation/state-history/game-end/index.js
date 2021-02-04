// @flow

import {BattleSceneView} from "../../../view";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import type {GameOver, GameEnd, GameEndX, GameStateX} from "gbraver-burst-core";
import {Animate} from "../../../../../../animation/animate";
import {empty} from "../../../../../../animation/delay";
import {castShinBraverGameOver, shinBraverWin} from "./shin-braver";
import {toGameOverParam} from "./animation-param";
import {castNeoLandozerGameOver, neoLandozerWin} from "./neo-landozer";
import {castLightningDozerGameOver, lightningDozerWin} from "./lightning-dozer";

/**
 * ゲーム終了アニメーション
 *
 * @param view ビュー
 * @param sceneState シーンの状態
 * @param gameState ゲームの状態
 * @return アニメーション
 */
export function gameEndAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameStateX<GameEnd>): Animate {
  const gameOver = castGameOver(gameState);
  if (!gameOver) {
    return empty();
  }

  const animationParam = toGameOverParam(view, gameOver);
  if (!animationParam) {
    return empty();
  }

  const shinBraver = castShinBraverGameOver(animationParam);
  if (shinBraver) {
    return shinBraverWin(shinBraver);
  }

  const neoLandozer = castNeoLandozerGameOver(animationParam);
  if (neoLandozer) {
    return neoLandozerWin(neoLandozer);
  }

  const lightningDozer = castLightningDozerGameOver(animationParam);
  if (lightningDozer) {
    return lightningDozerWin(lightningDozer);
  }
  
  return empty();
}

/**
 * ゲームエンド ゲームオーバにキャストする
 * キャストできない場合はnullを返す
 *
 * @param origin 変換元
 * @return 変換結果
 */
function castGameOver(origin: GameStateX<GameEnd>): ?GameStateX<GameEndX<GameOver>> {
  if (origin.effect.result.type !== 'GameOver') {
    return null;
  }

  const gameOver: GameOver = origin.effect.result;
  return ((origin: any): GameStateX<GameEndX<typeof gameOver>>);
}