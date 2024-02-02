import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotShout } from "../../pilot-shout";

/** シンヤ叫び 自発的にパイロットスキル発動 */
export const shinyaCryWhenSelfInitiatedPilotSkill = (
  props: Readonly<CustomBattleEventProps>,
) => playerPilotShout(props, "Shinya", "何故か無性にやる気が出てきたッス");
