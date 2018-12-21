// @flow

import {Animate} from "../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {Battle} from "gbraver-burst-core/lib/effect/battle/effect/index";
import {delay, empty} from "../../../../animation/delay";
import {all} from "../../../../animation/all";
import {DamageIndicator} from "../../../../game-object/damage-indicator/damage-indicator";
import type {BattleResult} from "gbraver-burst-core/lib/effect/battle/result/battle-result";

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
  const {
    playerBatteryNumber,
    enemyBatteryNumber,
    playerDamageIndicator,
    enemyDamageIndicator,
    playerGauge,
    enemyGauge,
    playerSprite,
    enemySprite,
    turnIndicator
  } = view.threeDimensionLayer;

  const attacker = {
    state: gameState.players.find(v => v.playerId === effect.attacker) || gameState.players[0],
    gauge: isAttacker ? playerGauge : enemyGauge,
    batteryNumber: isAttacker ? playerBatteryNumber: enemyBatteryNumber,
    sprite: isAttacker ? playerSprite : enemySprite
  };

  const defender = {
    state: gameState.players.find(v => v.playerId !== effect.attacker) || gameState.players[0],
    gauge: isAttacker ? enemyGauge : playerGauge,
    batteryNumber: isAttacker ? enemyBatteryNumber : playerBatteryNumber,
    sprite: isAttacker ? enemySprite : playerSprite,
    damageIndicator: isAttacker ? enemyDamageIndicator : playerDamageIndicator
  };

  return empty()
    .chain(
      all(
        attacker.batteryNumber.popUp(effect.attackerBattery),
        attacker.gauge.battery(attacker.state.armdozer.battery),
        defender.batteryNumber.popUp(effect.defenderBattery),
        defender.gauge.battery(defender.state.armdozer.battery),
        delay(1200).chain(
          turnIndicator.invisible()
        )
      )
    ).chain(
      all(
        attacker.sprite.attack(),
        delay(attacker.sprite.punchHitDuration())
          .chain(
            damageIndicatorAnimation(defender.damageIndicator, effect.result),
            defender.sprite.knockBack(),
            defender.gauge.hp(defender.state.armdozer.hp)
          ))
    ).chain(
      defender.sprite.recoverKnockBack()
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
