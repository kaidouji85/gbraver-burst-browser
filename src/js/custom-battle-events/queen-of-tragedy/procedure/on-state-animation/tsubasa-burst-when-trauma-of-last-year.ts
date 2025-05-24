import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isEnemyBurstActivatedFromCurrentState } from "../../../is-burst-activated";
import { tsubasaBurstShoutWhenTraumaOfLastYear } from "../../animation/tsubasa-burst-shout-when-trauma-of-last-year";
import { QueenOfTragedyProps } from "../../props";

/** ツバサ バースト 去年のトラウマ */
export const tsubasaBurstWhenTraumaOfLastYear: ConditionalAnimation<
  CustomStateAnimationProps & QueenOfTragedyProps
> = (props) =>
  isEnemyBurstActivatedFromCurrentState(props) &&
  props.eventState.chapter.type === "TraumaOfLastYear"
    ? tsubasaBurstShoutWhenTraumaOfLastYear(props)
    : null;
