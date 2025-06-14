import { LastStateEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { BatterySystemTutorialProps } from "../../props";
import { selfInitiatedPilotSkill } from "../../stories/self-intiated-pilot-skill";

/**
 * 条件を満たした場合「プレイヤーが自主的にパイロットスキルを発動した」を実行する
 * @param props イベントプロパティ
 * @returns 実行した場合はtrue、そうでない場合はfalse
 */
export async function doSelfInitiatedPilotSkillIfNeeded(
  props: Readonly<LastStateEventProps & BatterySystemTutorialProps>,
): Promise<boolean> {
  const hasPilotSkill = props.update.some(
    (state) => state.effect.name === "PilotSkillEffect",
  );
  if (hasPilotSkill && !props.eventState.isExplainedPilotSkillAtZeroBattery) {
    await selfInitiatedPilotSkill(props);
    return true;
  }

  return false;
}
