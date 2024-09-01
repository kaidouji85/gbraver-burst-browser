import { Animate } from "../../../../animation/animate";
import { CustomStateAnimation } from "../../../../td-scenes/battle/custom-battle-event";
import { ConditionalAnimation } from "../../../get-animation-if-conditional-met";
import { gaiPilotSkillShoutWhenYuuyaBatteryIsOver5 } from "../../animation/gai-pilot-skill-shout-when-yuuya-battery-is-over-5";
import { PrinceOfFallenSunProps } from "../../props";

/** ガイ パイロットスキル（ユウヤのバッテリーが5以上） */
export const gaiPilotSkillWhenYuuyaBatteryIsOver5: ConditionalAnimation<
  CustomStateAnimation & PrinceOfFallenSunProps
> = (props) => {
  let result: Animate | null = null;

  const { currentState, enemyId, playerId } = props;
  const { effect } = currentState;
  const player = currentState.players.find((p) => p.playerId === playerId);
  const isGaiActivatedPilotSkill =
    effect.name === "PilotSkillEffect" && effect.invokerId === enemyId;
  const isYuuyaBatteryOver5 = player ? player.armdozer.battery >= 5 : false;
  if (isGaiActivatedPilotSkill && isYuuyaBatteryOver5) {
    result = gaiPilotSkillShoutWhenYuuyaBatteryIsOver5(props);
  }

  return result;
};
