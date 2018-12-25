// @flow
import type {ArmdozerGameObjects} from "../../../view/td/armdozer-game-objects";
import type {PlayerState} from "gbraver-burst-core/lib/game-state/player-state";
import {BattleSceneView} from "../../../view";
import type {Battle} from "gbraver-burst-core/lib/effect/battle/effect/index";

/** ゲームオブジェクト、ステータスを攻撃側、防御側に振り分けたもの */
export type AttackObjects = {
  attacker: ArmdozerGameObjects,
  attackerState: PlayerState,
  defender: ArmdozerGameObjects,
  defenderState: PlayerState,
  view: BattleSceneView,
  effect: Battle
};