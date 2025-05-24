import { Animate } from "../../../../animation/animate";
import { CustomStateAnimationProps } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { yuuyaBurstShoutWhenGaiActivatedSkill } from "../../animation/yuuya-burst-shout-when-gai-activated-skill";
import { PrinceOfFallenSunProps } from "../../props";

/** ユウヤ バースト（ガイがパイロットスキルを発動） */
export const yuuyaBurstWhenGaiActivatedSkill: ConditionalAnimation<
  CustomStateAnimationProps & PrinceOfFallenSunProps
> = (props) => {
  let result: Animate | null = null;
  const { currentState, update, playerId, enemyId } = props;
  const hasGaiActivatedSkill = update.some(
    (s) =>
      s.effect.name === "PilotSkillEffect" && s.effect.invokerId === enemyId,
  );
  const isYuuyaBurst =
    currentState.effect.name === "BurstEffect" &&
    currentState.effect.burstPlayer === playerId;
  if (hasGaiActivatedSkill && isYuuyaBurst) {
    result = yuuyaBurstShoutWhenGaiActivatedSkill(props);
  }

  return result;
};
