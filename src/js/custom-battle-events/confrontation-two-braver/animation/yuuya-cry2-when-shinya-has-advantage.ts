import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { switchEnemyPilotCry } from "../../pilot-cry";

/**
 * チャプター シンヤ有利 ユウヤ叫び2
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const yuuyaCry2WhenShinyaHasAdvantage = (
  props: Readonly<CustomBattleEventProps>,
) => switchEnemyPilotCry(props, "Yuuya", "Gブレイバーを舐めるな");
