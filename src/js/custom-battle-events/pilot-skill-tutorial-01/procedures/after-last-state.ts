import { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { invisibleShoutMessageWindowWhenGameEnd } from "../../invisible-shout-message-window";
import { PilotSkillTutorial01Props } from "../props";
import { PilotSkillTutorial01State } from "../state";
import { playerLose } from "../stories/player-lose";

/**
 * 条件を満たした場合「プレイヤー敗北ストーリー」を再生する
 * @param props イベントプロパティ
 * @return trueでストーリーを再生した
 */
async function executePlayerLoseIfNeeded(
  props: Readonly<LastState>,
): Promise<boolean> {
  const foundGameEnd = props.update.find((v) => v.effect.name === "GameEnd");
  if (!foundGameEnd || foundGameEnd.effect.name !== "GameEnd") {
    return false;
  }

  await playerLose(props);
  invisibleAllMessageWindows(props);
  return true;
}

/**
 * 最終ステート直後
 * @param props イベントプロパティ
 * @return ステート更新結果
 */
export async function afterLastState(
  props: Readonly<LastState & PilotSkillTutorial01Props>,
): Promise<PilotSkillTutorial01State> {
  invisibleShoutMessageWindowWhenGameEnd(props);
  if (await executePlayerLoseIfNeeded(props)) {
    return props.state;
  }

  return props.state;
}
