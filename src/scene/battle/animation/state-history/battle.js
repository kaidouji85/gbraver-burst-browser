// @flow

import {TweenAnimation} from "../../../../animation/tween-animation";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {Battle} from "gbraver-burst-core/lib/effect/battle/effect/index";
import {delay, empty} from "../../../../animation/delay";
import {DamageIndicator} from "../../../../game-object/damage-indicator/damage-indicator";
import type {BattleResult} from "gbraver-burst-core/lib/effect/battle/result/battle-result";
import type {ArmDozerSprite} from "../../../../game-object/armdozer/common/armdozer-sprite";

/**
 * 戦闘アニメーション
 *
 * @param view ビュー
 * @param sceneState シーンステート
 * @param gameState ゲームステート
 * @param effect 戦闘結果
 * @return アニメーション
 */
export function battleAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState, effect: Battle): TweenAnimation {
  const isAttacker = effect.attacker === sceneState.playerId;
  const {
    playerBatteryNumber,
    enemyBatteryNumber,
    playerDamageIndicator,
    enemyDamageIndicator,
    playerGauge,
    enemyGauge,
    playerSprite,
    enemySprite
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
      attacker.batteryNumber.popUp(effect.attackerBattery),
      attacker.gauge.battery(attacker.state.armdozer.battery),
      defender.batteryNumber.popUp(effect.defenderBattery),
      defender.gauge.battery(defender.state.armdozer.battery),
    ).chain(
      attacker.sprite.frontStep()
    ).chain(
      attacker.sprite.punch(),
      delay(attacker.sprite.punchHitDuration())
        .chain(
          damageIndicatorAnimation(defender.damageIndicator, effect.result),
          defender.sprite.knockBack(),
          defender.gauge.hp(defender.state.armdozer.hp)
        )
    ).chain(
      attacker.sprite.backStep()
    ).chain(
      defender.sprite.recoverKnockBack()
    );
}

/** 戦闘結果に応じたダメージ表示を行う */
function damageIndicatorAnimation(damageIndicator: DamageIndicator, result: BattleResult): TweenAnimation {
  switch (result.name) {
    case 'NormalHit':
    case 'Guard':
    case 'CriticalHit':
      return damageIndicator.popUp(result.damage);
    default:
      return damageIndicator.popUp(0);
  }
}
