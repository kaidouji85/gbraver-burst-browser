// @flow

import {Animate} from "../../../../../animation/animate";
import {BattleSceneView} from "../../../view";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import {visibleBattery} from "./visible-battery";
import {delay, empty} from "../../../../../animation/delay";
import {attackAnimation} from "./attack";
import type {Battle} from "gbraver-burst-core/lib/effect/battle/effect/index";
import type {AttackAnimationParam} from "./attack/animation-param";
import type {BattleResult} from "gbraver-burst-core/lib/effect/battle/result/battle-result";
import type {ArmDozerSprite} from "../../../../../game-object/armdozer/armdozer-sprite";

/**
 * 戦闘アニメーション
 *
 * @param view ビュー
 * @param sceneState シーンステート
 * @param gameState ゲームステート
 * @return アニメーション
 */
export function battleAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
  if (gameState.effect.name !== 'Battle') {
    return empty();
  }

  const effect: Battle = gameState.effect;
  const attackerState = gameState.players.find(v => v.playerId === effect.attacker);
  const attackerTD = view.td.players.find(v => v.playerId === effect.attacker);
  const attackerHUD = view.hud.players.find(v => v.playerId === effect.attacker);
  const defenderState = gameState.players.find(v => v.playerId !== effect.attacker);
  const defenderTD = view.td.players.find(v => v.playerId !== effect.attacker);
  const defenderHUD = view.hud.players.find(v => v.playerId !== effect.attacker);
  if (!attackerState || !attackerTD || !attackerHUD || !defenderState || !defenderTD || !defenderHUD) {
    return empty();
  }

  const param: AttackAnimationParam<ArmDozerSprite, BattleResult> = {
    attackerBattery: effect.attackerBattery,
    attackerState: attackerState,
    attackerTD: attackerTD,
    attackerHUD: attackerHUD,
    defenderBattery: effect.defenderBattery,
    defenderState: defenderState,
    defenderTD: defenderTD,
    defenderHUD: defenderHUD,
    tdObjects: view.td.gameObjects,
    hudObjects: view.hud.gameObjects,
    result: effect.result,
  };

  return visibleBattery(param)
    .chain(delay(500))
    .chain(attackAnimation(param))
    .chain(delay(500));
}

