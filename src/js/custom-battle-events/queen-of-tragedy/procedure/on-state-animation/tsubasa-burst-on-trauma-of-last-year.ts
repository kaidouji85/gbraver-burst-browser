import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isEnemyBurstActivatedFromCurrentState } from "../../../is-burst-activated";
import { tsubasaBurstShoutOnTraumaOfLastYear } from "../../animation/tsubasa-burst-shout-on-trauma-of-last-year";
import { QueenOfTragedyProps } from "../../props";

/** ツバサ バースト 去年のトラウマ */
export const tsubasaBurstOnTraumaOfLastYear: ConditionalAnimation<
  CustomStateAnimation & QueenOfTragedyProps
> = (props) =>
  isEnemyBurstActivatedFromCurrentState(props) &&
  props.eventState.chapter.type === "TraumaOfLastYear"
    ? tsubasaBurstShoutOnTraumaOfLastYear(props)
    : null;
