import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotCry } from "../../pilot-cry";

/**
 * シンヤ パイロットスキル 叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaPilotSkillCry = (props: Readonly<CustomBattleEventProps>) =>
  playerPilotCry(props, "Shinya", "なぜか無性にやる気が出てきたッス");
