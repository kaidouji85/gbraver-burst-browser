import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { switchPlayerPilotCry } from "../../pilot-cry";

/**
 * シンヤ有利 シンヤ パイロットスキル
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaPilotSkillWhenShinyaHasAdvantage = (
  props: Readonly<CustomBattleEventProps>,
) => switchPlayerPilotCry(props, "Shinya", "このままリードを保つッス");
