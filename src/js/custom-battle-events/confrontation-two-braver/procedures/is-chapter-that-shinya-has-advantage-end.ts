import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { turnCount } from "../../turn-count";
import {ConfrontationTwoBraverProps} from "../props";

/** isChapterThatShinyaHasAdvantageEndのプロパティ */
export type Props = CustomBattleEventProps & ConfrontationTwoBraverProps;

/**
 * チャプター シンヤ有利 が終了したか
 * @param props イベントプロパティ
 * @return trueで終了した
 */
export function isChapterThatShinyaHasAdvantageEnd(
  props: Readonly<Props>,
): boolean {
  const turn = turnCount(props.stateHistory);
  return 3 < turn && props.state.chapter.type === "ShinyaHasAdvantage";
}
