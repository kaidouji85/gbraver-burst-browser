import { GameEnd } from "gbraver-burst-core";

import { LastStateEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { QueenOfTragedyProps } from "../../props";
import { Conditions } from "./conditions";

/**
 * 条件オブジェクトを生成する
 * @param props イベントプロパティ
 * @returns 条件オブジェクト
 */
export function createConditions(
  props: LastStateEventProps & QueenOfTragedyProps,
): Conditions {
  const foundGameEnd = props.update
    .map((s) => s.effect)
    .find((e) => e.name === "GameEnd");
  const gameEnd: GameEnd | null =
    foundGameEnd && foundGameEnd.name === "GameEnd" ? foundGameEnd : null;
  return { ...props, gameEnd };
}
