import { Animate } from "../../../animation/animate";
import { empty } from "../../../animation/delay";
import { CustomStateAnimation } from "../../../td-scenes/battle/custom-battle-event";
import { tsubasaFirstAttackShout } from "../animation/tsubasa-first-attack-shout";
import { StateAnimationTypeContainer } from "../state-animation-type";

/**
 * カスタムステートアニメーション
 * @param props イベントプロパティ
 * @returns カスタムステートアニメーション
 */
export function onStateAnimation(
  props: Readonly<CustomStateAnimation & StateAnimationTypeContainer>,
): Animate {
  const { stateAnimationType } = props;
  switch (stateAnimationType) {
    case "TsubasaFirstAttack":
      return tsubasaFirstAttackShout(props);
    default:
      return empty();
  }
}
