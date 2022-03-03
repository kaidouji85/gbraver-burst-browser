// @flow

import {Animate} from "../../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameStateX, StartGame} from "gbraver-burst-core";
import {delay, empty} from "../../../../../animation/delay";
import {process} from '../../../../../animation/process'
import {BattleSceneSounds} from "../../sounds";

/**
 * ゲーム開始時のアニメーション
 *
 * @param view ビュー
 * @param sceneState シーンの状態
 * @param gameState ゲームの状態
 * @param sounds 戦闘シーンの効果音
 * @return アニメーション
 */
export function startGameAnimation(view: BattleSceneView, sceneState: BattleSceneState, sounds: BattleSceneSounds, gameState: GameStateX<StartGame>): Animate {
  const activeHUDPlayer = view.hud.players.find(v => v.playerId === gameState.activePlayerId);
  if (!activeHUDPlayer) {
    return empty();
  }

  return empty().chain(
    delay(800),
    process(() => {
      sounds.batteryRecover.play();
    }),
    activeHUDPlayer.turnStart.show()
      .chain(delay(600))
      .chain(activeHUDPlayer.turnStart.hidden()),
  );
}