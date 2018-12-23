// @flow
import type {ArmdozerGameObjects} from "../../../view/td/armdozer-game-objects";
import type {PlayerState} from "gbraver-burst-core/lib/game-state/player-state";
import {BattleSceneView} from "../../../view";
import type {Battle} from "gbraver-burst-core/lib/effect/battle/effect/index";

/** 戦闘アニメーションに関連するオブジェクトを集めたもの */
export type BattleObjects = {
  attacker: ArmdozerGameObjects,
  attackerState: PlayerState,
  defender: ArmdozerGameObjects,
  defenderState: PlayerState,
  view: BattleSceneView,
  effect: Battle
};