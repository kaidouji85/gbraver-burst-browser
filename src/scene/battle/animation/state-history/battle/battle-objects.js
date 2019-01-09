// @flow
import type {ArmdozerGameObjects} from "../../../view/td/armdozer-game-objects";
import type {PlayerState} from "gbraver-burst-core/lib/game-state/player-state";
import {BattleSceneView} from "../../../view";
import type {Battle} from "gbraver-burst-core/lib/effect/battle/effect/index";
import type {ArmDozerSprite} from "../../../../../game-object/armdozer/armdozer-sprite";

/**
 * 戦闘アニメーションオブジェクト
 */
export type BattleObjects<T> = {
  attacker: ArmdozerGameObjects<T>,
  attackerState: PlayerState,
  defender: ArmdozerGameObjects<ArmDozerSprite>,
  defenderState: PlayerState,
  view: BattleSceneView,
  effect: Battle
};