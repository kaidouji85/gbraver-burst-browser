import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { separatePlayers } from "../../separate-players";
import { turnCount } from "../../turn-count";
import { ConfrontationTwoBraverProps } from "../props";
import { shinyaMonologueWhenShinyaHasAdvantage } from "../stories/shinya-monologue-when-shinya-has-advantage";
import { isShinyaAdvantage } from "./is-shinya-advantage";

/**
 * 条件を満たした場合、チャプター「シンヤ有利」を開始する
 * @param props イベントプロパティ
 * @return チャプターを開始した場合、trueを返す
 */
export async function startShinyaHasAdvantageIfNeeded(
  props: Readonly<CustomBattleEventProps & ConfrontationTwoBraverProps>,
): Promise<boolean> {
  const separatedPlayers = separatePlayers(props);
  if (!separatedPlayers) {
    return false;
  }

  const { player: shinya, enemy: yuuya } = separatedPlayers;
  const turn = turnCount(props.stateHistory);
  if (
    props.state.chapter.type !== "ShinyaHasAdvantage" &&
    turn === 3 &&
    isShinyaAdvantage({ shinya, yuuya })
  ) {
    await shinyaMonologueWhenShinyaHasAdvantage(props);
    return true;
  }

  return false;
}
