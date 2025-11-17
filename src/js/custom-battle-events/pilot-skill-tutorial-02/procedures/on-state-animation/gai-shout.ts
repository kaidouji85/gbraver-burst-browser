import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { isPlayerBurstActivatedFromCurrentState } from "../../../is-burst-activated";
import { isPlayerPilotSkillActivatedFromCurrentState } from "../../../is-pilot-skill-activated";
import { gaiBurst } from "../../animation/ga-burst";
import { gaiFinishBlow } from "../../animation/gai-finish-blow";
import { gaiPilotSkill } from "../../animation/gai-pilot-skill";
import { PilotSkillTutorial02Props } from "../../props";

/** ガイの叫び */
export const gaiShout: ConditionalAnimation<
  CustomStateAnimationProps & PilotSkillTutorial02Props
>[] = [
  (props) =>
    isPlayerBurstActivatedFromCurrentState(props) ? gaiBurst(props) : null,
  (props) =>
    isPlayerPilotSkillActivatedFromCurrentState(props)
      ? gaiPilotSkill(props)
      : null,
  (props) => {
    const { currentState } = props;
    return currentState.effect.name === "BatteryDeclaration" &&
      currentState.effect.attacker === props.playerId
      ? gaiFinishBlow(props)
      : null;
  },
];
