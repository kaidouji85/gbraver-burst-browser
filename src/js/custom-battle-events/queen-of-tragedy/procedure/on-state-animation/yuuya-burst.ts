import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerBurstActivatedFromCurrentState } from "../../../is-burst-activated";
import { yuuyaBurstShout } from "../../animation/yuuya-burst-shout";
import { QueenOfTragedyProps } from "../../props";

/** ユウヤ バースト */
export const yuuyaBurst: ConditionalAnimation<
  CustomStateAnimationProps & QueenOfTragedyProps
> = (props) =>
  isPlayerBurstActivatedFromCurrentState(props) ? yuuyaBurstShout(props) : null;
