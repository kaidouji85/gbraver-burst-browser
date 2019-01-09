import type {BattleObjects} from "../battle-objects";
import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
import {Animate} from "../../../../../../animation/animate";
import {ShinBraver} from "../../../../../../game-object/armdozer/shin-breaver/shin-braver";
import {shinBraverAttack} from "./shin-braver";
import {emptyBattleAnimation} from "../empty-battle-animation";

/** 攻撃側スプライトに応じて、戦闘アニメーションを切り替える */
export function attackAnimation(objects: BattleObjects<ArmDozerSprite>): Animate {
  if (objects.attacker.sprite instanceof ShinBraver) {
    return shinBraverAttack(objects);
  } else {
    return emptyBattleAnimation(objects);
  }
}