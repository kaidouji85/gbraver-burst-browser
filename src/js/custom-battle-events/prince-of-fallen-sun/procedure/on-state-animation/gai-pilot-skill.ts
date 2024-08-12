import { Animate } from "../../../../animation/animate";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { gaiPilotSkillShout } from "../../animation/gai-pilot-skill-shout";
import { PrinceOfFallenSunProps } from "../../props";

/** ガイ パイロットスキル */
export const gaiPilotSkill: ConditionalAnimation<
  CustomStateAnimation & PrinceOfFallenSunProps
> = (props) => {
  let result: Animate | null = null;

  const { currentState, enemyId } = props;
  const { effect } = currentState;

  if (effect.name === "PilotSkillEffect" && effect.invokerId === enemyId) {
    result = gaiPilotSkillShout(props);
  }

  return result;
};
