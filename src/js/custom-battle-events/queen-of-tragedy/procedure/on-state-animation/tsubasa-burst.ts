import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isEnemyBurstActivatedFromCurrentState } from "../../../is-burst-activated";
import { tsubasaBurstShout } from "../../animation/tsubasa-burst-shout";
import { QueenOfTragedyProps } from "../../props";

/** ツバサ バースト */
export const tsubasaBurst: ConditionalAnimation<
  CustomStateAnimationProps & QueenOfTragedyProps
> = (props) =>
  isEnemyBurstActivatedFromCurrentState(props)
    ? tsubasaBurstShout(props)
    : null;
