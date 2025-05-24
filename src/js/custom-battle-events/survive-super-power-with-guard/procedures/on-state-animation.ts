import { Animate } from "../../../animation/animate";
import { empty } from "../../../animation/delay";
import { CustomStateAnimation } from "../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenTurnChange } from "../../invisible-shout-message-window";
import { raitoFinishBlowShout } from "../animation/raito-finish-blow-shout";
import { raitoShockAtSurvivalShout } from "../animation/raito-shock-at-survival-shout";
import { tsubasaFirstAttackShout } from "../animation/tsubasa-first-attack-shout";
import { StateAnimationTypeContainer } from "../state-animation-type";

/**
 * アニメーション種別に応じたアニメーションを取得する
 * @param props イベントプロパティ
 * @returns アニメーション
 */
function getAnimate(
  props: Readonly<CustomStateAnimation & StateAnimationTypeContainer>,
) {
  const { stateAnimationType } = props;
  switch (stateAnimationType) {
    case "TsubasaFirstAttack":
      return tsubasaFirstAttackShout(props);
    case "RaitoFinishBlow":
      return raitoFinishBlowShout(props);
    case "RaitoShockAtSurvivalShout":
      return raitoShockAtSurvivalShout(props);
    default:
      return empty();
  }
}

/**
 * カスタムステートアニメーション
 * @param props イベントプロパティ
 * @returns カスタムステートアニメーション
 */
export const onStateAnimation = (
  props: Readonly<CustomStateAnimation & StateAnimationTypeContainer>,
): Animate =>
  invisibleShoutMessageWindowWhenTurnChange(props) ?? getAnimate(props);
