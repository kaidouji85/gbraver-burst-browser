// @flow

import {Animate} from "../../../../../animation/animate";
import {BattleSceneView} from "../../../view";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {Battle} from "gbraver-burst-core/lib/effect/battle/effect/index";
import type {BattleObjects} from "./battle-objects";
import {ShinBraver} from "../../../../../game-object/armdozer/shin-breaver/shin-braver";
import {shinBraverAttack} from "./shin-braver";
import {emptyBattleAnimation} from "./empty-battle-animation";
import {visibleBattery} from "./visible-battery";
import {delay} from "../../../../../animation/delay";

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
  const objects: BattleObjects = {
    attacker: isAttacker ? view.td.player : view.td.enemy,
    attackerState: gameState.players.find(v => v.playerId === effect.attacker) || gameState.players[0],
    defender: isAttacker ? view.td.enemy : view.td.player,
    defenderState: gameState.players.find(v => v.playerId !== effect.attacker) || gameState.players[0],
    view: view,
    effect: effect
  };

  return visibleBattery(objects)
    .chain(delay(500))
    .chain(attackAnimation(objects));
}

/** 攻撃側スプライトに応じて、戦闘アニメーションを切り替える */
function attackAnimation(objects: BattleObjects): Animate {
  if (objects.attacker.sprite instanceof ShinBraver) {
    return shinBraverAttack(objects.attacker.sprite, objects);
  } else {
    return emptyBattleAnimation(objects);
  }
}