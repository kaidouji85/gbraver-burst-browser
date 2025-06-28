import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenTurnChange } from "../../../invisible-shout-message-window";
import { raitoBurstShout } from "../../animation/raito-burst-shout";
import { raitoBurstShoutWhenIgnoreComboAttack } from "../../animation/raito-burst-shout-when-ignore-combo-attack";
import { raitoBurstShoutWhenIgnoreSkill } from "../../animation/raito-burst-shout-when-ignore-skill";
import { raitoFeintShout } from "../../animation/raito-feint-shout";
import { raitoFinishShout } from "../../animation/raito-finish-shout";
import { raitoFirstAttackShout } from "../../animation/raito-first-attack-shout";
import {
  raitoSecondAttackShout1,
  raitoSecondAttackShout2,
} from "../../animation/raito-second-attack-shout";
import { tsubasaAttackTurnBurstShout } from "../../animation/tsubasa-attack-turn-burst-shout";
import { tsubasaComboAttackShout } from "../../animation/tsubasa-combo-attack-shout";
import { tsubasaDefenseTurnBurstShout } from "../../animation/tsubasa-defense-turn-burst-shout";
import { tsubasaFirstAttackShout } from "../../animation/tsubasa-first-attack-shout";
import { tsubasaPilotSkillShout } from "../../animation/tsubasa-pilot-skill-shout";
import { isRaitoBurst } from "./is-raito-burst";
import { isRaitoBurstWhenIgnoreComboAttack } from "./is-raito-burst-when-ignore-combo-attack";
import { isRaitoBurstWhenIgnoreSkill } from "./is-raito-burst-when-ignore-skill";
import { isRaitoFeint } from "./is-raito-feint";
import { isRaitoFinish } from "./is-raito-finish";
import { isRaitoFirstAttack } from "./is-raito-first-attack";
import {
  isRaitoSecondAttack1,
  isRaitoSecondAttack2,
} from "./is-raito-second-attack";
import { isTsubasaAttackTurnBurst } from "./is-tsubasa-attack-turn-burst";
import { isTsubasaComboAttack } from "./is-tsubasa-combo-attack";
import { isTsubasaDefenseTurnBurst } from "./is-tsubasa-defense-turn-burst";
import { isTsubasaFirstAttack } from "./is-tsubasa-first-attack";
import { isTsubasaPilotSkill } from "./is-tsubasa-pilot-skill";

/**
 * アニメーション種別に応じたアニメーションを取得する
 * @param props イベントプロパティ
 * @returns アニメーション
 */
function getAnimate(props: Readonly<CustomStateAnimationProps>) {
  let result = empty();
  if (isTsubasaComboAttack(props)) {
    result = tsubasaComboAttackShout(props);
  } else if (isTsubasaFirstAttack(props)) {
    result = tsubasaFirstAttackShout(props);
  } else if (isTsubasaAttackTurnBurst(props)) {
    result = tsubasaAttackTurnBurstShout(props);
  } else if (isTsubasaDefenseTurnBurst(props)) {
    result = tsubasaDefenseTurnBurstShout(props);
  } else if (isTsubasaPilotSkill(props)) {
    result = tsubasaPilotSkillShout(props);
  } else if (isRaitoFirstAttack(props)) {
    result = raitoFirstAttackShout(props);
  } else if (isRaitoSecondAttack1(props)) {
    result = raitoSecondAttackShout1(props);
  } else if (isRaitoSecondAttack2(props)) {
    result = raitoSecondAttackShout2(props);
  } else if (isRaitoBurstWhenIgnoreComboAttack(props)) {
    result = raitoBurstShoutWhenIgnoreComboAttack(props);
  } else if (isRaitoBurstWhenIgnoreSkill(props)) {
    result = raitoBurstShoutWhenIgnoreSkill(props);
  } else if (isRaitoBurst(props)) {
    result = raitoBurstShout(props);
  } else if (isRaitoFeint(props)) {
    result = raitoFeintShout(props);
  } else if (isRaitoFinish(props)) {
    result = raitoFinishShout(props);
  }

  return result;
}

/**
 * カスタムステートアニメーション
 * @param props イベントプロパティ
 * @returns カスタムステートアニメーション
 */
export const onStateAnimation = (
  props: Readonly<CustomStateAnimationProps>,
): Animate =>
  invisibleShoutMessageWindowWhenTurnChange(props) ?? getAnimate(props);
