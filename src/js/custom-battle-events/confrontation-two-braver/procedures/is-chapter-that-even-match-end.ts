import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { turnCount } from "../../turn-count";
import { ConfrontationTwoBraverProps } from "../props";

/**
 * チャプター イーブンマッチ が終了したか
 * @param props イベントプロパティ
 * @return trueで終了した
 */
export function isChapterThatEvenMatchEnd(
  props: Readonly<CustomBattleEventProps & ConfrontationTwoBraverProps>,
): boolean {
  const turn = turnCount(props.stateHistory);
  return 3 < turn && props.state.chapter.type === "EvenMatch";
}
