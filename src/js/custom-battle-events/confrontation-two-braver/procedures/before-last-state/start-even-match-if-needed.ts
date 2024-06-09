import {
  CustomBattleEventProps,
  LastStateContainer,
} from "../../../../td-scenes/battle/custom-battle-event";
import { isEvenMatch } from "../../../is-even-match";
import { separatePlayersFromLastState } from "../../../separate-players";
import { turnCount } from "../../../turn-count";
import { ConfrontationTwoBraverProps } from "../../props";
import { shinyaMonologueWhenEvenMatch } from "../../stories/shinya-monologue-when-even-match";

/**
 * 条件を満たした場合、チャプター「イーブンマッチ」を開始する
 * @param props イベントプロパティ
 * @returns チャプターを開始した場合、trueを返す
 */
export async function startEvenMatchIfNeeded(
  props: Readonly<
    CustomBattleEventProps & LastStateContainer & ConfrontationTwoBraverProps
  >,
): Promise<boolean> {
  const separatedPlayers = separatePlayersFromLastState(props);
  if (!separatedPlayers) {
    return false;
  }

  const { player, enemy } = separatedPlayers;
  const turn = turnCount(props.stateHistory);
  if (
    props.state.chapter.type !== "EvenMatch" &&
    turn === 3 &&
    isEvenMatch({ player, enemy })
  ) {
    await shinyaMonologueWhenEvenMatch(props);
    return true;
  }

  return false;
}
