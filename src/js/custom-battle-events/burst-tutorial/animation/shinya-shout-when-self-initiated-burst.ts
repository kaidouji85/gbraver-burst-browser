import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/** シンヤ叫び 自発的にバースト発動 */
export const shinyaShoutWhenSelfInitiatedBurst = (
  props: Readonly<CustomBattleEventProps>,
) => playerPilotOnlyShout(props, "Shinya", "バーストON？ 何なんすかこのレバーは？");
