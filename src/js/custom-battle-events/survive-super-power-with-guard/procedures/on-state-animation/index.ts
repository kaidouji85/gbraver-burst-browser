import { Animate } from "../../../../animation/animate";
import { empty } from "../../../../animation/delay";
import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenTurnChange } from "../../../invisible-shout-message-window";
import { raitoAttackShoutWhenAdvantage } from "../../animation/raito-attack-shout-when-advantage";
import { raitoAttackShoutWhenDisadvantage } from "../../animation/raito-attack-shout-when-disadvantage";
import { raitoAttackShoutWhenEven } from "../../animation/raito-attack-shout-when-even";
import { raitoBurstShout } from "../../animation/raito-burst-shout";
import { raitoBurstShoutWhenIgnoreComboAttack } from "../../animation/raito-burst-shout-when-ignore-combo-attack";
import { raitoBurstShoutWhenIgnoreSkill } from "../../animation/raito-burst-shout-when-ignore-skill";
import { raitoFeintShout } from "../../animation/raito-feint-shout";
import { raitoFinishBlowShout } from "../../animation/raito-finish-blow-shout";
import { raitoFirstAttackShout } from "../../animation/raito-first-attack-shout";
import { raitoPilotSkillShout } from "../../animation/raito-pilot-skill-shout";
import { raitoSecondAttackShout } from "../../animation/raito-second-attack-shout";
import { tsubasaAttackTurnBurstShout } from "../../animation/tsubasa-attack-turn-burst-shout";
import { tsubasaComboAttackShout } from "../../animation/tsubasa-combo-attack-shout";
import { tsubasaDefenseTurnBurstShout } from "../../animation/tsubasa-defense-turn-burst-shout";
import { tsubasaFeintShout } from "../../animation/tsubasa-feint-shout";
import { tsubasaFeintShoutOnFirstAttackForRetry } from "../../animation/tsubasa-feint-shout-on-first-attack-for-retry";
import { tsubasaFinishBlowShout } from "../../animation/tsubasa-finish-blow-shout";
import { tsubasaFirstAttackShout } from "../../animation/tsubasa-first-attack-shout";
import { tsubasaFirstAttackShoutForRetry } from "../../animation/tsubasa-first-attack-shout-for-retry";
import { tsubasaPilotSkillShout } from "../../animation/tsubasa-pilot-skill-shout";
import { tsubasaSecondAttackShout } from "../../animation/tsubasa-second-attack-shout";
import { isRaitoAttackWhenAdvantage } from "./is-raito-attack-when-advantage";
import { isRaitoAttackWhenDisadvantage } from "./is-raito-attack-when-disadvantage";
import { isRaitoAttackWhenEven } from "./is-raito-attack-when-even";
import { isRaitoBurst } from "./is-raito-burst";
import { isRaitoBurstWhenIgnoreComboAttack } from "./is-raito-burst-when-ignore-combo-attack";
import { isRaitoBurstWhenIgnoreSkill } from "./is-raito-burst-when-ignore-skill";
import { isRaitoFeint } from "./is-raito-feint";
import { isRaitoFinishBlow } from "./is-raito-finish-blow";
import { isRaitoFirstAttack } from "./is-raito-first-attack";
import { isRaitoPilotSkill } from "./is-raito-pilot-skill";
import { isRaitoSecondAttack } from "./is-raito-second-attack";
import { isTsubasaAttackTurnBurst } from "./is-tsubasa-attack-turn-burst";
import { isTsubasaComboAttack } from "./is-tsubasa-combo-attack";
import { isTsubasaDefenseTurnBurst } from "./is-tsubasa-defense-turn-burst";
import { isTsubasaFeint } from "./is-tsubasa-feint";
import { isTsubasaFeintOnFirstAttackForRetry } from "./is-tsubasa-feint-on-first-attack-for-retry";
import { isTsubasaFinishBlow } from "./is-tsubasa-finish-blow";
import { isTsubasaFirstAttack } from "./is-tsubasa-first-attack";
import { isTsubasaFirstAttackForRetry } from "./is-tsubasa-first-attack-for-retry";
import { isTsubasaPilotSkill } from "./is-tsubasa-pilot-skill";
import { isTsubasaSecondAttack } from "./is-tsubasa-second-attack";

/**
 * アニメーション種別に応じたアニメーションを取得する
 * @param props イベントプロパティ
 * @returns アニメーション
 */
function getAnimate(props: Readonly<CustomStateAnimationProps>) {
  let result = empty();
  if (isTsubasaFinishBlow(props)) {
    result = tsubasaFinishBlowShout(props);
  } else if (isTsubasaComboAttack(props)) {
    result = tsubasaComboAttackShout(props);
  } else if (isTsubasaFeintOnFirstAttackForRetry(props)) {
    result = tsubasaFeintShoutOnFirstAttackForRetry(props);
  } else if (isTsubasaFirstAttackForRetry(props)) {
    result = tsubasaFirstAttackShoutForRetry(props);
  } else if (isTsubasaFirstAttack(props)) {
    result = tsubasaFirstAttackShout(props);
  } else if (isTsubasaSecondAttack(props)) {
    result = tsubasaSecondAttackShout(props);
  } else if (isTsubasaFeint(props)) {
    result = tsubasaFeintShout(props);
  } else if (isTsubasaAttackTurnBurst(props)) {
    result = tsubasaAttackTurnBurstShout(props);
  } else if (isTsubasaDefenseTurnBurst(props)) {
    result = tsubasaDefenseTurnBurstShout(props);
  } else if (isTsubasaPilotSkill(props)) {
    result = tsubasaPilotSkillShout(props);
  } else if (isRaitoFirstAttack(props)) {
    result = raitoFirstAttackShout(props);
  } else if (isRaitoFinishBlow(props)) {
    result = raitoFinishBlowShout(props);
  } else if (isRaitoSecondAttack(props)) {
    result = raitoSecondAttackShout(props);
  } else if (isRaitoAttackWhenAdvantage(props)) {
    result = raitoAttackShoutWhenAdvantage(props);
  } else if (isRaitoAttackWhenDisadvantage(props)) {
    result = raitoAttackShoutWhenDisadvantage(props);
  } else if (isRaitoAttackWhenEven(props)) {
    result = raitoAttackShoutWhenEven(props);
  } else if (isRaitoBurstWhenIgnoreComboAttack(props)) {
    result = raitoBurstShoutWhenIgnoreComboAttack(props);
  } else if (isRaitoBurstWhenIgnoreSkill(props)) {
    result = raitoBurstShoutWhenIgnoreSkill(props);
  } else if (isRaitoBurst(props)) {
    result = raitoBurstShout(props);
  } else if (isRaitoFeint(props)) {
    result = raitoFeintShout(props);
  } else if (isRaitoPilotSkill(props)) {
    result = raitoPilotSkillShout(props);
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
