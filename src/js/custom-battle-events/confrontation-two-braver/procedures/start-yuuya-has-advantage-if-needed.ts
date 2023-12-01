import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { isAllPlayerNoDamage } from "../../is-all-player-no-damage";
import { separatePlayers } from "../../separate-players";
import { turnCount } from "../../turn-count";
import { ConfrontationTwoBraverProps } from "../props";
import { shinyaMonologueWhenYuuyaHasAdvantage } from "../stories/shinya-monologue-when-yuuya-has-advantage";

/**
 * 条件を満たした場合、チャプター「ユウヤ有利」を開始する
 * @param props イベントプロパティ
 * @return チャプターを開始した場合、trueを返す
 */
export async function startYuuyaHasAdvantageIfNeeded(
  props: Readonly<CustomBattleEventProps & ConfrontationTwoBraverProps>,
): Promise<boolean> {
  if (props.state.chapter.type === "YuuyaHasAdvantage") {
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
  if (yuuya.armdozer.hp <= shinya.armdozer.hp) {
    return false;
  }

  if (isAllPlayerNoDamage([shinya, yuuya])) {
    return false;
  }

  await shinyaMonologueWhenYuuyaHasAdvantage(props);
  return true;
}
