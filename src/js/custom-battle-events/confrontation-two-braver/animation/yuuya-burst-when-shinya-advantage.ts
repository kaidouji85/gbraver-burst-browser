import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotCry } from "../../pilot-cry";

/**
 * ユウヤのバースト シンヤ有利時
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const yuuyaBurstWhenShinyaAdvantage = (
  props: Readonly<CustomBattleEventProps>,
) => enemyPilotCry(props, "Yuuya", "甘いぜ シンヤ！！");
