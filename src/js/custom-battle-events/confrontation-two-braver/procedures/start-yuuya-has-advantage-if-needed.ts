import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { separatePlayers } from "../../separate-players";
import { turnCount } from "../../turn-count";
import { ConfrontationTwoBraverProps } from "../props";
import { shinyaMonologueWhenYuuyaHasAdvantage } from "../stories/shinya-monologue-when-yuuya-has-advantage";
import { isYuuyaAdvantage } from "./is-yuuya-advantage";

/**
 * 条件を満たした場合、チャプター「ユウヤ有利」を開始する
 * @param props イベントプロパティ
 * @return チャプターを開始した場合、trueを返す
 */
export async function startYuuyaHasAdvantageIfNeeded(
  props: Readonly<CustomBattleEventProps & ConfrontationTwoBraverProps>,
): Promise<boolean> {
  const separatedPlayers = separatePlayers(props);
  if (!separatedPlayers) {
    return false;
  }

  const { player: shinya, enemy: yuuya } = separatedPlayers;
  const turn = turnCount(props.stateHistory);
  if (
    props.state.chapter.type !== "YuuyaHasAdvantage" &&
    turn === 3 &&
    isYuuyaAdvantage({ shinya, yuuya })
  ) {
    await shinyaMonologueWhenYuuyaHasAdvantage(props);
    return true;
  }

  return false;
}