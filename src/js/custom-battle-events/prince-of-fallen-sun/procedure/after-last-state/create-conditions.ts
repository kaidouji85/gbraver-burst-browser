import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { PrinceOfFallenSunProps } from "../../props";
import { Conditions } from "./conditions";

/**
 * 条件オブジェクトを生成する
 * @param props イベントプロパティ
 * @returns 条件オブジェクト
 */
export function createConditions(
  props: LastState & PrinceOfFallenSunProps,
): Conditions {
  const { update } = props;
  const gameEnd =
    update
      .map((s) => s.effect)
      .filter((e) => e.name === "GameEnd")
      .at(0) ?? null;
  return { ...props, gameEnd };
}
