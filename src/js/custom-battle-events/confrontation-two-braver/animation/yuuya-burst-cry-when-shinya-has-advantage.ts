import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotCry } from "../../pilot-cry";

/**
 * ユウヤ バースト 叫び シンヤ有利時
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const yuuyaBurstCryWhenShinyaHasAdvantage = (
  props: Readonly<CustomBattleEventProps>,
) => enemyPilotCry(props, "Yuuya", "甘いぜ シンヤ！！");
