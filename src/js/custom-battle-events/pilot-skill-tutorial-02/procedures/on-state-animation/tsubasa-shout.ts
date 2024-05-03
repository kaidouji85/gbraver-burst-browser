import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isEnemyBurstActivated } from "../../../is-burst-activated";
import { tsubasaBurst } from "../../animation/tsubasa-burst";
import { tsubasaFirstBattle } from "../../animation/tsubasa-first-battle";
import { PilotSkillTutorial02Props } from "../../props";

/** ツバサの叫び */
export const tsubasaShout: ConditionalAnimation<
  CustomStateAnimation & PilotSkillTutorial02Props
>[] = [
  (props) => (isEnemyBurstActivated(props) ? tsubasaBurst(props) : null),
  (props) => {
    const { currentState } = props;
    return currentState.effect.name === "BatteryDeclaration" &&
      currentState.effect.attacker !== props.playerId
      ? tsubasaFirstBattle(props)
      : null;
  },
];
