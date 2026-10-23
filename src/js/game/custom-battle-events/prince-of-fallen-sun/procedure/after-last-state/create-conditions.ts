import { LastStateEventProps } from "../../../../scenes/td-scenes/battle/custom-battle-event";
import { PrinceOfFallenSunProps } from "../../props";
import { Conditions } from "./conditions";

/**
 * 条件オブジェクトを生成する
 * @param props イベントプロパティ
 * @returns 条件オブジェクト
 */
export function createConditions(
  props: LastStateEventProps & PrinceOfFallenSunProps,
): Conditions {
  const { update } = props;
  const player =
    update.at(-1)?.players.find((p) => p.playerId === props.playerId) ?? null;
  const gameEnd =
    update
      .map((s) => s.effect)
      .filter((e) => e.name === "GameEnd")
      .at(0) ?? null;
  return { ...props, player, gameEnd };
}
