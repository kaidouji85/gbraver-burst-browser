import { Animate } from "../../../../animation/animate";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { yuuyaPilotSkillShout } from "../../animation/yuuya-pilot-skill-shout";
import { PrinceOfFallenSunProps } from "../../props";

/** ユウヤ パイロットスキル */
export const yuuyaPilotSkill: ConditionalAnimation<
  CustomStateAnimation & PrinceOfFallenSunProps
> = (props) => {
  let result: Animate | null = null;

  const { currentState, playerId } = props;
  const { effect } = currentState;

  if (effect.name === "PilotSkillEffect" && effect.invokerId === playerId) {
    result = yuuyaPilotSkillShout(props);
  }

  return result;
};
