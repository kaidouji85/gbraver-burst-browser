import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotShout } from "../../pilot-shout";

/**
 * シンヤ有利 シンヤ パイロットスキル
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaPilotSkillWhenShinyaHasAdvantage = (
  props: Readonly<CustomBattleEventProps>,
) => playerPilotShout(props, "Shinya", "このままリードを保つッス");
