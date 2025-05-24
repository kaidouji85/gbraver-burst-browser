import { Animate } from "../../../animation/animate";
import { empty } from "../../../animation/delay";
import { CustomStateAnimationProps } from "../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenTurnChange } from "../../invisible-shout-message-window";
import { tsubasaFirstAttackShout } from "../animation/tsubasa-first-attack-shout";
import { StateAnimationTypeContainer } from "../state-animation-type";

/**
 * アニメーション種別に応じたアニメーションを取得する
 * @param props イベントプロパティ
 * @returns アニメーション
 */
function getAnimate(
  props: Readonly<CustomStateAnimationProps & StateAnimationTypeContainer>,
) {
  const { stateAnimationType } = props;
  switch (stateAnimationType) {
    case "TsubasaFirstAttack":
      return tsubasaFirstAttackShout(props);
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
  props: Readonly<CustomStateAnimationProps & StateAnimationTypeContainer>,
): Animate =>
  invisibleShoutMessageWindowWhenTurnChange(props) ?? getAnimate(props);
