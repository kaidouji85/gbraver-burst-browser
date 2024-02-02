import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isEnemyBurstActivated } from "../../../is-burst-activated";
import { raitoBurstShout } from "../../animation/raito-burst-shout";
import { BurstTutorialProps } from "../../props";

/** ライト バースト発動 */
export const raitoBurst: ConditionalAnimation<
  CustomStateAnimation & BurstTutorialProps
>[] = [(props) => (isEnemyBurstActivated(props) ? raitoBurstShout(props) : null)];
