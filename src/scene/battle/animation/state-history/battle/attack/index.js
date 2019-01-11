import type {BattleAnimationObjects} from "../animation-objects";
import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
import {Animate} from "../../../../../../animation/animate";
import {ShinBraver} from "../../../../../../game-object/armdozer/shin-breaver/shin-braver";
import {shinBraverAttack} from "./shin-braver";
import {emptyBattleAnimation} from "./empty-battle-animation";
import {empty} from "../../../../../../animation/delay";
import {BattleSceneView} from "../../../../view";
import type {BattleSceneState} from "../../../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {Battle} from "gbraver-burst-core/lib/effect/battle/effect/index";

/** 攻撃側スプライトに応じて、戦闘アニメーションを切り替える */
export function attackAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
  return emptyBattleAnimation(view, sceneState, gameState);

  /*
  if (objects.attacker.sprite instanceof ShinBraver) {
    return shinBraverAttack(objects);
  } else {
    return emptyBattleAnimation(objects);
  }
  */
}