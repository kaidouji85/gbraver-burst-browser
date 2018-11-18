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
    enemyDamageIndicator,
    playerDamageIndicator,
    playerSprite,
    enemySprite
  } = view.threeDimensionLayer;

  const attackerBattery = isAttacker ? playerBatteryNumber: enemyBatteryNumber;
  const defenderBattery = isAttacker ? enemyBatteryNumber : playerBatteryNumber;
  const damageIndicator = isAttacker ? enemyDamageIndicator : playerDamageIndicator;
  const attacker = isAttacker ? playerSprite : enemySprite;
  const defender = isAttacker ? enemySprite : playerSprite;

  return empty()
    .chain(
      attackerBattery.popUp(effect.attackerBattery),
      defenderBattery.popUp(effect.defenderBattery)
    ).chain(
      attacker.frontStep()
    ).chain(
      attacker.punch(),
      delay(attacker.punchHitDuration())
        .chain(
          damageIndicatorAnimation(damageIndicator, effect.result),
          defender.damage()
        )
    ).chain(
      attacker.backStep()
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
