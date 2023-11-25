import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { turnCount } from "../../turn-count";
import { Chapter } from "../chapter";
import { ConfrontationTwoBraverProps } from "../props";
import { shinyaMonologueWhenShinyaHasAdvantage } from "../stories/shinya-monologue-when-shinya-has-advantage";

/**
 * 条件を満たした場合、チャプター「シンヤ有利」を開始する
 * @param props イベントプロパティ
 * @return 開始した場合はチャプター情報を返す、そうでなかったらnullを返す
 */
export async function startShinyaHasAdvantageIfNeeded(
  props: Readonly<CustomBattleEventProps & ConfrontationTwoBraverProps>,
): Promise<null | Chapter> {
  if (props.state.chapter.type === "ShinyaHasAdvantage") {
    return null;
  }

  const turn = turnCount(props.stateHistory);
  if (turn !== 3) {
    return null;
  }

  // TODO シンヤ有利の判定をする
  await shinyaMonologueWhenShinyaHasAdvantage(props);
  return {
    type: "ShinyaHasAdvantage",
  };
}
