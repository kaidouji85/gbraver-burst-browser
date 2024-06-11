import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { tsubasaBurstShout } from "../../animation/tsubasa-burst-shout";
import { QueenOfTragedyProps } from "../../props";

/** ツバサ バースト */
export const tsubasaBurst: ConditionalAnimation<
  CustomStateAnimation & QueenOfTragedyProps
> = (props) =>
  props.currentState.effect.name === "BurstEffect" &&
  props.currentState.effect.burstPlayer === props.enemyId
    ? tsubasaBurstShout(props)
    : null;
