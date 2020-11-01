// @flow

import {BattleSceneView} from "../../../view";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import type {GameEnd, GameStateX} from "gbraver-burst-core";
import {Animate} from "../../../../../../animation/animate";
import {delay, empty} from "../../../../../../animation/delay";
import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
import {ShinBraver} from "../../../../../../game-object/armdozer/shin-braver/shin-braver";
import {shinBraverWin} from "./shin-braver";
import {NeoLandozer} from "../../../../../../game-object/armdozer/neo-landozer/neo-landozer";
import {neoLandozerWin} from "./neo-landozer";
import {LightningDozer} from "../../../../../../game-object/armdozer/lightning-dozer/lightning-dozer";
import {lightningDozerWin} from "./lightning-dozer";
import {WingDozer} from "../../../../../../game-object/armdozer/wing-dozer/wing-dozer";
import {wingDozerWin} from "./wing-dozer";

/**
 * ゲーム終了アニメーション
 *
 * @param view ビュー
 * @param sceneState シーンの状態
 * @param gameState ゲームの状態
 * @return アニメーション
 */
export function gameEndAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameStateX<GameEnd>): Animate {
  const effect: GameEnd = gameState.effect;
  if (effect.result.type !== 'GameOver') {
    return empty();
  }

  const gameOver = effect.result;
  const winnerArmdozer = view.td.armdozerObjects.find(v => v.playerId === gameOver.winner);
  if (!winnerArmdozer) {
    return empty();
  }

  return win(winnerArmdozer.sprite())
    .chain(delay(500));
}

/**
 * 勝利ポーズ
 *
 * @param sprite スプライト
 * @return アニメーション
 */
function win(sprite: ArmDozerSprite): Animate {
  if (sprite instanceof ShinBraver) {
    return shinBraverWin(sprite);
  }

  if (sprite instanceof NeoLandozer) {
    return neoLandozerWin(sprite);
  }

  if (sprite instanceof LightningDozer) {
    return lightningDozerWin(sprite);
  }

  if (sprite instanceof WingDozer) {
    return wingDozerWin(sprite);
  }

  return empty();
}