import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * シンヤ パイロットスキル 叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaPilotSkillShout = (
  props: Readonly<CustomBattleEventProps>,
) => playerPilotOnlyShout(props, "Shinya", "なぜか無性にやる気が出てきたッス");
