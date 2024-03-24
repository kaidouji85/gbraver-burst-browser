import { onStart } from "../../../animation/on-start";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/** シンヤ叫び 自発的にバースト発動 */
export const shinyaShoutWhenSelfInitiatedBurst = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(
      props,
      "Shinya",
      "バーストON？ 何なんすかこのレバーは？",
    );
  });
