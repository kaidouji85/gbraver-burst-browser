import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerBurstActivatedFromCurrentState } from "../../../is-burst-activated";
import { yuuyaBurstShoutWhenLastYearTrauma } from "../../animation/yuuya-burst-shout-when-last-year-trauma";
import { QueenOfTragedyProps } from "../../props";

/** ユウヤ バースト 去年のトラウマ */
export const yuuyaBurstOnTraumaOfLastYear: ConditionalAnimation<
  CustomStateAnimation & QueenOfTragedyProps
> = (props) =>
  isPlayerBurstActivatedFromCurrentState(props) &&
  props.state.chapter.type === "TraumaOfLastYear"
    ? yuuyaBurstShoutWhenLastYearTrauma(props)
    : null;
