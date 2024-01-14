import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotCry } from "../../pilot-cry";

/** シンヤ叫び 自発的にバースト発動 */
export const shinyaCryWhenSelfInitiatedBurst = (
  props: Readonly<CustomBattleEventProps>,
) => playerPilotCry(props, "Shinya", "バーストON？ 何なんすかこのレバーは？");
