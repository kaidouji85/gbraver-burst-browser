import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { invisibleAllMessageWindows } from "../../../invisible-all-message-windows";
import { separatePlayersFromLastState } from "../../../separate-players";
import { shinyaMonologueWhenHeLose } from "../../stories/shinya-monologue-when-he-lose";
import { yuuyaShoutWhenYuuyaCompleteVictory } from "../../stories/yuuya-shout-when-yuuya-complete-victory";
import { yuuyaShoutWhenYuuyaNarrowVictory } from "../../stories/yuuya-shout-when-yuuya-narrow-victory";
import { yuuyaShoutWhenYuuyaVictory } from "../../stories/yuuya-shout-when-yuuya-victory";

/**
 * 条件を満たした場合、ゲーム終了時のシナリオを再生する
 * @param props イベントプロパティ
 * @returns ゲーム終了時のシナリオを再生した場合、trueを返す
 */
export async function endGameIfNeeded(
  props: Readonly<LastState>,
): Promise<boolean> {
  const isGameEnd = props.update.some(
    (state) => state.effect.name == "GameEnd",
  );
  const separatedPlayers = separatePlayersFromLastState(props);
  if (!isGameEnd || !separatedPlayers) {
    return false;
  }

  const { enemy: yuuya } = separatedPlayers;
  const isYuuyaCompleteVictory =
    yuuya.armdozer.hp === yuuya.armdozer.maxHp && yuuya.pilot.enableSkill;
  const isYuuyaNarrowVictory =
    yuuya.armdozer.hp < yuuya.armdozer.maxHp && !yuuya.pilot.enableSkill;
  props.view.dom.enemyShoutMessageWindow.visible(false);
  if (isYuuyaCompleteVictory) {
    await yuuyaShoutWhenYuuyaCompleteVictory(props);
  } else if (isYuuyaNarrowVictory) {
    await yuuyaShoutWhenYuuyaNarrowVictory(props);
  } else {
    await yuuyaShoutWhenYuuyaVictory(props);
  }

  await shinyaMonologueWhenHeLose(props);
  invisibleAllMessageWindows(props);
  return true;
}
