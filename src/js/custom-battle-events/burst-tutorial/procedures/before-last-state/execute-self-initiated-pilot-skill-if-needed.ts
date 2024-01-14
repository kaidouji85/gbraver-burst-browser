import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { BurstTutorialProps } from "../../props";
import { selfInitiatedPilotSkill } from "../../stories/self-initiated-pilot-skill";

/**
 * 条件を満たした場合、「プレイヤーが自主的にパイロットスキルを発動した」を再生する
 * @param props イベントプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function executeSelfInitiatedPilotSkillIfNeeded(
  props: Readonly<LastState & BurstTutorialProps>,
): Promise<void> {
  const hasPlayerPilotSkill = props.update.some(
    (state) =>
      state.effect.name === "PilotSkillEffect" &&
      state.effect.invokerId === props.playerId,
  );
  if (hasPlayerPilotSkill && !props.state.isLoseIfNoDefense5Complete) {
    await selfInitiatedPilotSkill(props);
  }
}
