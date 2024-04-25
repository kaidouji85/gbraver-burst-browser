import { CustomBattleEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { isPlayerAdvantage } from "../../../is-player-advantage";
import { separatePlayersFromLastState } from "../../../separate-players";
import { turnCount } from "../../../turn-count";
import { ConfrontationTwoBraverProps } from "../../props";
import { shinyaMonologueWhenShinyaHasAdvantage } from "../../stories/shinya-monologue-when-shinya-has-advantage";

/**
 * 条件を満たした場合、チャプター「シンヤ有利」を開始する
 * @param props イベントプロパティ
 * @returns チャプターを開始した場合、trueを返す
 */
export async function startShinyaHasAdvantageIfNeeded(
  props: Readonly<CustomBattleEventProps & ConfrontationTwoBraverProps>,
): Promise<boolean> {
  const separatedPlayers = separatePlayersFromLastState(props);
  if (!separatedPlayers) {
    return false;
  }

  const { player, enemy } = separatedPlayers;
  const turn = turnCount(props.stateHistory);
  if (
    props.state.chapter.type !== "ShinyaHasAdvantage" &&
    turn === 3 &&
    isPlayerAdvantage({ player, enemy })
  ) {
    await shinyaMonologueWhenShinyaHasAdvantage(props);
    return true;
  }

  return false;
}
