import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isEnemyBurstActivated } from "../../../is-burst-activated";
import { tsubasaBurstShout } from "../../animation/tsubasa-burst-shout";
import { QueenOfTragedyProps } from "../../props";
import { Animate } from "../../../../animation/animate";
import { tsubasaBurstShoutOnTraumaOfLastYear } from "../../animation/tsubasa-burst-shout-on-trauma-of-last-year";

/** ツバサ バースト */
export const tsubasaBurst: ConditionalAnimation<
  CustomStateAnimation & QueenOfTragedyProps
>[] = [
  (props) => {
    let result: Animate | null = null;

    const { chapter } = props.state;
    const isTsubasaBurstActivated = isEnemyBurstActivated(props);
    if (chapter.type === "TraumaOfLastYear" && isTsubasaBurstActivated) {
      result = tsubasaBurstShoutOnTraumaOfLastYear(props);
    } else if (isEnemyBurstActivated(props)) {
      result = tsubasaBurstShout(props);
    }

    return result;
  },
];
