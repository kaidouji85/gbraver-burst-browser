// @flow

import {Animate} from "../../../../../animation/animate";
import {BattleSceneView} from "../../../view";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {Battle} from "gbraver-burst-core/lib/effect/battle/effect/index";
import {delay, empty} from "../../../../../animation/delay";
import {all} from "../../../../../animation/all";
import {DamageIndicator} from "../../../../../game-object/damage-indicator/damage-indicator";
import type {BattleResult} from "gbraver-burst-core/lib/effect/battle/result/battle-result";
import type {AttackObjects} from "./attack-objects";
import type {ArmdozerGameObjects} from "../../../view/td/armdozer-game-objects";
import type {PlayerState} from "gbraver-burst-core/lib/game-state/player-state";
import {visibleBattery} from "./visible-battery";

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
  const objects: AttackObjects = {
    attacker: isAttacker ? view.td.player : view.td.enemy,
    attackerState: gameState.players.find(v => v.playerId === effect.attacker) || gameState.players[0],
    defender: isAttacker ? view.td.enemy : view.td.player,
    defenderState: gameState.players.find(v => v.playerId !== effect.attacker) || gameState.players[0],
    view: view,
    effect: effect
  };

  // TODO 削除する
  const attackerState = gameState.players.find(v => v.playerId === effect.attacker) || gameState.players[0];
  const defenderState = gameState.players.find(v => v.playerId !== effect.attacker) || gameState.players[0];
  const attacker = isAttacker ? view.td.player : view.td.enemy;
  const defender = isAttacker ? view.td.enemy : view.td.player;

  return visibleBattery(objects)
    .chain(
      all(
        attacker.sprite.attack(),
        delay(attacker.sprite.punchHitDuration())
          .chain(
            damageIndicatorAnimation(defender.damageIndicator, effect.result),
            defender.sprite.knockBack(),
            defender.gauge.hp(defenderState.armdozer.hp)
          ))
    ).chain(
      attacker.sprite.stand(),
      defender.sprite.stand()
    );
}

/** 戦闘結果に応じたダメージ表示を行う */
function damageIndicatorAnimation(damageIndicator: DamageIndicator, result: BattleResult): Animate {
  switch (result.name) {
    case 'NormalHit':
    case 'Guard':
    case 'CriticalHit':
      return damageIndicator.popUp(result.damage);
    default:
      return damageIndicator.popUp(0);
  }
}
