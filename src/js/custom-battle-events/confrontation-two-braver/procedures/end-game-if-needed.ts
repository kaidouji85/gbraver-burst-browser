import { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { separatePlayers } from "../../separate-players";
import { shinyaMonologueWhenHeLose } from "../stories/shinya-monologue-when-he-lose";
import { yuuyaCryWhenYuuyaCompleteVictory } from "../stories/yuuya-cry-when-yuuya-complete-victory";
import { yuuyaCryWhenYuuyaNarrowVictory } from "../stories/yuuya-cry-when-yuuya-narrow-victory";
import { yuuyaCryWhenYuuyaVictory } from "../stories/yuuya-cry-when-yuuya-victory";

/**
 * 条件を満たした場合、ゲーム終了時のシナリオを再生する
 * @param props イベントプロパティ
 * @return ゲーム終了時のシナリオを再生した場合、trueを返す
 */
export async function endGameIfNeeded(
  props: Readonly<LastState>,
): Promise<boolean> {
  const isGameEnd = props.update.some(
    (state) => state.effect.name == "GameEnd",
  );
  const separatedPlayers = separatePlayers(props);
  if (!isGameEnd || !separatedPlayers) {
    return false;
  }

  const { enemy: yuuya } = separatedPlayers;
  if (yuuya.armdozer.hp === yuuya.armdozer.maxHp && yuuya.pilot.enableSkill) {
    await yuuyaCryWhenYuuyaCompleteVictory(props);
  } else if (
    yuuya.armdozer.hp < yuuya.armdozer.maxHp &&
    !yuuya.pilot.enableSkill
  ) {
    await yuuyaCryWhenYuuyaNarrowVictory(props);
  } else {
    await yuuyaCryWhenYuuyaVictory(props);
  }

  await shinyaMonologueWhenHeLose(props);
  return true;
}
