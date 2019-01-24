// @flow

import {BattleSceneView} from "../../../../view";
import type {BattleSceneState} from "../../../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import {delay, empty} from "../../../../../../animation/delay";
import type {Battle} from "gbraver-burst-core/lib/effect/battle/effect/index";
import {NeoLandozer} from "../../../../../../game-object/armdozer/neo-landozer/neo-landozer";
import {Animate} from "../../../../../../animation/animate";
import {all} from "../../../../../../animation/all";

/** ネオランドーザ攻撃 */
export function neoLandozerAttack(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
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

  if (!(attackerArmdozer.sprite instanceof NeoLandozer)) {
    return empty();
  }

  const neoLandozer: NeoLandozer = attackerArmdozer.sprite;

  const attack = (damage: number): Animate =>
    all(
      neoLandozer.armHammer(),
      delay(800).chain(
        defenderArmdozer.damageIndicator.popUp(damage),
        defenderArmdozer.sprite.knockBack(),
        defenderArmdozer.gauge.hp(defenderState.armdozer.hp)
      )
    ).chain(
      defenderArmdozer.sprite.knockBackToStand()
    );

  const miss = (): Animate =>
    all(
      neoLandozer.armHammer(),
      delay(800).chain(
        defenderArmdozer.sprite.avoid()
      )
    );

  const feint = (): Animate =>
    defenderArmdozer.sprite.avoid();

  if (effect.result.name === 'NormalHit') {
    return attack(effect.result.damage);
  } else if (effect.result.name === 'Guard') {
    return attack(effect.result.damage);
  } else if (effect.result.name === 'CriticalHit') {
    return attack(effect.result.damage);
  } else if (effect.result.name === 'Miss') {
    return miss();
  } else if (effect.result.name === 'Feint' && effect.result.isDefenderMoved) {
    return feint();
  }

  return empty();
}