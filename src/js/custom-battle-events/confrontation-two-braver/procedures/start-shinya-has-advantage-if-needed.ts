import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { turnCount } from "../../turn-count";
import { ConfrontationTwoBraverProps } from "../props";
import { shinyaMonologueWhenShinyaHasAdvantage } from "../stories/shinya-monologue-when-shinya-has-advantage";

/**
 * 条件を満たした場合、チャプター「シンヤ有利」を開始する
 * @param props イベントプロパティ
 * @return チャプターを開始した場合、trueを返す
 */
export async function startShinyaHasAdvantageIfNeeded(
  props: Readonly<CustomBattleEventProps & ConfrontationTwoBraverProps>,
): Promise<boolean> {
  if (props.state.chapter.type === "ShinyaHasAdvantage") {
    return false;
  }

  const turn = turnCount(props.stateHistory);
  if (turn !== 3) {
    return false;
  }

  // TODO シンヤ有利の判定をする
  await shinyaMonologueWhenShinyaHasAdvantage(props);
  return true;
}
