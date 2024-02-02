import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotShout } from "../../pilot-shout";

/** シンヤ叫び 自発的にバースト発動 */
export const shinyaShoutWhenSelfInitiatedBurst = (
  props: Readonly<CustomBattleEventProps>,
) => playerPilotShout(props, "Shinya", "バーストON？ 何なんすかこのレバーは？");
