// @flow
import type {ArmdozerObjects} from "../../../view/td/armdozer-objects";
import type {PlayerState} from "gbraver-burst-core/lib/game-state/player-state";
import {BattleSceneView} from "../../../view";
import type {Battle} from "gbraver-burst-core/lib/effect/battle/effect/index";
import type {ArmDozerSprite} from "../../../../../game-object/armdozer/armdozer-sprite";

/**
 * 戦闘アニメーションに関連するオブジェクトをまとめたもの
 * 全ての戦闘アニメーションは本パラメータのみを受け取る
 *
 * @type T 攻撃側スプライト
 */
export type BattleAnimationObjects<T> = {
  attacker: ArmdozerObjects<T>,
  attackerState: PlayerState,
  defender: ArmdozerObjects<ArmDozerSprite>,
  defenderState: PlayerState,
  view: BattleSceneView,
  effect: Battle
};