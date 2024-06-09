import { totalCorrectPower } from "gbraver-burst-core";

import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { turnCount } from "../../../turn-count";
import { PilotSkillTutorial02Props } from "../../props";
import { doPilotSkill } from "../../stories/do-pilot-skill";

/**
 * 条件を満たせば「パイロットスキル発動を推奨」を再生する
 * @param props イベントプロパティ
 * @returns ストーリーを再生したか否か、trueで再生した
 */
export async function executeDoPilotSkillIfNeeded(
  props: Readonly<LastState & PilotSkillTutorial02Props>,
): Promise<boolean> {
  const { lastState } = props;
  const player = lastState.players.find((v) => v.playerId === props.playerId);
  if (player === undefined) {
    return false;
  }

  const correctPower = totalCorrectPower(player.armdozer.effects);
  const turn = turnCount(props.stateHistory);
  if (correctPower <= 0 && turn === 2 && !props.state.isDoPilotSkillComplete) {
    await doPilotSkill(props);
    return true;
  }

  return false;
}
