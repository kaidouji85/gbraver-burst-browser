import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { ZeroDefenseTutorialProps } from "../../props";
import { ZeroDefenseTutorialState } from "../../state";
import { selfInitiatedPilotSkill } from "../../stories/self-intiated-pilot-skill";

/**
 * 条件を満たした場合、「自発的にパイロットスキル発動」を再生する
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export async function executeSelfInitiatedPilotSkillIfNeeded(
  props: Readonly<LastState & ZeroDefenseTutorialProps>,
): Promise<ZeroDefenseTutorialState> {
  const hasPilotSkill = props.update.some(
    (state) => state.effect.name === "PilotSkillEffect",
  );
  if (hasPilotSkill && !props.state.isExplainedPilotSkillAtZeroBattery) {
    await selfInitiatedPilotSkill(props);
    return props.state;
  }

  return props.state;
}
