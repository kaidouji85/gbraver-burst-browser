import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotCry } from "../../pilot-cry";

/**
 * ユウヤ バッテリー宣言 叫び シンヤ有利時
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const yuuyaBatteryDeclarationCryWhenShinyaHasAdvantage = (
  props: Readonly<CustomBattleEventProps>,
) => enemyPilotCry(props, "Yuuya", "ジェネシスブレイバーを舐めるなよ！！");
