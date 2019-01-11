// @flow

import type {BattleAnimationObjects} from "../animation-objects";
import {ShinBraver} from "../../../../../../game-object/armdozer/shin-breaver/shin-braver";
import {Animate} from "../../../../../../animation/animate";
import {delay, empty} from "../../../../../../animation/delay";
import {all} from "../../../../../../animation/all";
import type {
  CriticalHit,
  Feint,
  Guard,
  Miss,
  NormalHit
} from "gbraver-burst-core/lib/effect/battle/result/battle-result";
import {BattleSceneView} from "../../../../view";
import type {BattleSceneState} from "../../../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {Battle} from "gbraver-burst-core/lib/effect/battle/effect/index";

/** シンブレイバーの攻撃アニメーション */
export function shinBraverAttack(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
  if (gameState.effect.name !== 'Battle') {
    return empty();
  }

  const effect: Battle = gameState.effect;
  const armdozers = [view.td.player, view.td.enemy];
  const attackerArmdozer = armdozers.find(v => v.playerId === effect.attacker);
  const attackerState = gameState.players.find(v => v.playerId === effect.attacker);
  const defenderArmdozer = armdozers.find(v => v.playerId !== effect.attacker);
  const defenderState = gameState.players.find(v => v.playerId !== effect.attacker);

  if (!attackerArmdozer || !attackerState || !defenderArmdozer || !defenderState) {
    return empty();
  }

  if (!(attackerArmdozer.sprite instanceof ShinBraver)) {
    return empty();
  }

  const shinBraver: ShinBraver = attackerArmdozer.sprite;

  const attack = (damage: number): Animate =>
    all(
      shinBraver.straightPunch(),
      delay(700).chain(
        defenderArmdozer.damageIndicator.popUp(damage),
        defenderArmdozer.sprite.knockBack(),
        defenderArmdozer.gauge.hp(defenderState.armdozer.hp)
      )
    ).chain(
      defenderArmdozer.sprite.knockBackToStand()
    );

  const guard = (damage: number): Animate =>
    all(
      shinBraver.straightPunch(),
      delay(700).chain(
        defenderArmdozer.damageIndicator.popUp(damage),
        defenderArmdozer.sprite.guard(),
        defenderArmdozer.gauge.hp(defenderState.armdozer.hp)
      )
    ).chain(
      defenderArmdozer.sprite.guardToStand()
    );

  const miss = (): Animate =>
    all(
      shinBraver.straightPunch(),
      delay(700).chain(
        defenderArmdozer.sprite.avoid()
      )
    );

  const feint = (): Animate =>
    defenderArmdozer.sprite.avoid();

  if (effect.result.name === 'NormalHit') {
    return attack(effect.result.damage);
  } else if (effect.result.name === 'Guard') {
    return guard(effect.result.damage);
  } else if (effect.result.name === 'CriticalHit') {
    return attack(effect.result.damage);
  } else if (effect.result.name === 'Miss') {
    return miss();
  } else if (effect.result.name === 'Feint' && effect.result.isDefenderMoved) {
    return feint();
  }

  return empty();
}
