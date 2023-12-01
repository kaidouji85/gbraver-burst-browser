import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { isAllPlayerNoDamage } from "../../is-all-player-no-damage";
import { separatePlayers } from "../../separate-players";
import { turnCount } from "../../turn-count";
import { ConfrontationTwoBraverProps } from "../props";
import { shinyaMonologueWhenEvenMatch } from "../stories/shinya-monologue-when-even-match";

/**
 * 条件を満たした場合、チャプター「イーブンマッチ」を開始する
 * @param props イベントプロパティ
 * @return チャプターを開始した場合、trueを返す
 */
export async function startEvenMatchIfNeeded(
  props: Readonly<CustomBattleEventProps & ConfrontationTwoBraverProps>,
): Promise<boolean> {
  if (props.state.chapter.type === "EvenMatch") {
    return false;
  }

  const turn = turnCount(props.stateHistory);
  if (turn !== 3) {
    return false;
  }

  const lastState = props.stateHistory.at(-1);
  if (!lastState) {
    return false;
  }

  const separatedPlayers = separatePlayers(props);
  if (!separatedPlayers) {
    return false;
  }

  const { player: shinya, enemy: yuuya } = separatedPlayers;
  if (
    !isAllPlayerNoDamage([shinya, yuuya]) &&
    shinya.armdozer.hp !== yuuya.armdozer.hp
  ) {
    return false;
  }

  await shinyaMonologueWhenEvenMatch(props);
  return true;
}
