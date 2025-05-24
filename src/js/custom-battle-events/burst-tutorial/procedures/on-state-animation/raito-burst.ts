import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isEnemyBurstActivatedFromCurrentState } from "../../../is-burst-activated";
import { raitoBurstShout } from "../../animation/raito-burst-shout";
import { BurstTutorialProps } from "../../props";

/** ライト バースト発動 */
export const raitoBurst: ConditionalAnimation<
  CustomStateAnimationProps & BurstTutorialProps
>[] = [
  (props) =>
    isEnemyBurstActivatedFromCurrentState(props)
      ? raitoBurstShout(props)
      : null,
];
