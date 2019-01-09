// @flow

import {Animate} from "../../../../../animation/animate";
import {BattleSceneView} from "../../../view";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {Battle} from "gbraver-burst-core/lib/effect/battle/effect/index";
import type {BattleAnimationObjects} from "./battle-animation-objects";
import {visibleBattery} from "./visible-battery";
import {delay} from "../../../../../animation/delay";
import type {ArmDozerSprite} from "../../../../../game-object/armdozer/armdozer-sprite";
import {attackAnimation} from "./attack";

/**
 * 戦闘アニメーション
 *
 * @param view ビュー
 * @param sceneState シーンステート
 * @param gameState ゲームステート
 * @param effect 戦闘結果
 * @return アニメーション
 */
export function battleAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState, effect: Battle): Animate {
  const isAttacker = effect.attacker === sceneState.playerId;
  const objects: BattleAnimationObjects<ArmDozerSprite> = {
    attacker: isAttacker ? view.td.player : view.td.enemy,
    attackerState: gameState.players.find(v => v.playerId === effect.attacker) || gameState.players[0],
    defender: isAttacker ? view.td.enemy : view.td.player,
    defenderState: gameState.players.find(v => v.playerId !== effect.attacker) || gameState.players[0],
    view: view,
    effect: effect
  };

  return visibleBattery(objects)
    .chain(delay(500))
    .chain(attackAnimation(objects))
    .chain(delay(500));
}

