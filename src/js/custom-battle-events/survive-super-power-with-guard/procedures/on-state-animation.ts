import { Animate } from "../../../animation/animate";
import { empty } from "../../../animation/delay";
import { CustomStateAnimationProps } from "../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenTurnChange } from "../../invisible-shout-message-window";
import { raitoFirstAttackShout } from "../animation/raito-first-attack-shout";
import { tsubasaAttackTurnBurstShout } from "../animation/tsubasa-attack-turn-burst-shout";
import { tsubasaDefenseTurnBurst } from "../animation/tsubasa-defense-turn-burst";
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
    case "TsubasaAttackTurnBurst":
      return tsubasaAttackTurnBurstShout(props);
    case "TsubasaDefenseTurnBurst":
      return tsubasaDefenseTurnBurst(props);
    case "RaitoFirstAttack":
      return raitoFirstAttackShout(props);
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
