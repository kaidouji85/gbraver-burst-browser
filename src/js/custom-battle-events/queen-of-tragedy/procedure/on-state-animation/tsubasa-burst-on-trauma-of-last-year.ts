import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isEnemyBurstActivated } from "../../../is-burst-activated";
import { tsubasaBurstShoutOnTraumaOfLastYear } from "../../animation/tsubasa-burst-shout-on-trauma-of-last-year";
import { QueenOfTragedyProps } from "../../props";

/** ツバサ バースト 去年のトラウマ */
export const tsubasaBurstOnTraumaOfLastYear: ConditionalAnimation<
  CustomStateAnimation & QueenOfTragedyProps
> = (props) =>
  isEnemyBurstActivated(props) &&
  props.state.chapter.type === "TraumaOfLastYear"
    ? tsubasaBurstShoutOnTraumaOfLastYear(props)
    : null;
