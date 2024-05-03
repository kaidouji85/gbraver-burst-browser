import { totalCorrectPower } from "gbraver-burst-core";

import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { turnCount } from "../../../turn-count";
import { PilotSkillTutorial02Props } from "../../props";
import { shouldAttack3OrMore } from "../../stories/should-attack3-or-more";

/**
 * 条件を満たせば「3以上で攻撃する」を再生する
 * @param props イベントプロパティ
 * @returns ストーリーを再生したか否か、trueで再生した
 */
export async function executeShouldAttack3OrMoreIfNeeded(
  props: Readonly<LastState & PilotSkillTutorial02Props>,
): Promise<boolean> {
  const lastState = props.update.at(-1);
  if (lastState === undefined) {
    return false;
  }

  const player = lastState.players.find((v) => v.playerId === props.playerId);
  if (player === undefined) {
    return false;
  }

  const correctPower = totalCorrectPower(player.armdozer.effects);
  const turn = turnCount(props.stateHistory);
  if (
    0 < correctPower &&
    turn === 2 &&
    !props.state.isShouldAttack3OrMoreComplete
  ) {
    await shouldAttack3OrMore(props);
    return true;
  }

  return false;
}
