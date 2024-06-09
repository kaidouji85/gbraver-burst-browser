import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isEnemyBurstActivated } from "../../../is-burst-activated";
import { tsubasaBurstShout } from "../../animation/tsubasa-burst-shout";
import { QueenOfTragedyProps } from "../../props";

/** ツバサ バースト */
export const tsubasaBurst: ConditionalAnimation<
  CustomStateAnimation & QueenOfTragedyProps
>[] = [
  (props) => (isEnemyBurstActivated(props) ? tsubasaBurstShout(props) : null),
];
