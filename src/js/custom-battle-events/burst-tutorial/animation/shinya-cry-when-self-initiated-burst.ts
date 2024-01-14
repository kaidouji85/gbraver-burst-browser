import { playerCry } from "../../../../../stories/message-window.stories";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";

/** シンヤ叫び 自発的にバースト発動 */
export const shinyaCryWhenSelfInitiatedBurst = (
  props: Readonly<CustomBattleEventProps>,
) => playerCry(props, "Shinya", "このレバーは一体？");
