import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { gaiBurst } from "../../animation/ga-burst";
import { gaiFinishBlow } from "../../animation/gai-finish-blow";
import { gaiPilotSkill } from "../../animation/gai-pilot-skill";
import { PilotSkillTutorial02Props } from "../../props";

/** ガイの叫び */
export const gaiShout: ConditionalAnimation<
  CustomStateAnimationProps & PilotSkillTutorial02Props
>[] = [
  (props) =>
    props.currentState.effect.name === "BurstEffect" &&
    props.currentState.effect.burstPlayer === props.playerId
      ? gaiBurst(props)
      : null,
  (props) =>
    props.currentState.effect.name === "PilotSkillEffect" &&
    props.currentState.effect.invokerId === props.playerId
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
