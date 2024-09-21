import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ユウヤ バースト 叫び
 * @param props
 */
export const yuuyaBurstShout = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    playerPilotOnlyShout(
      props,
      "Yuuya",
      `Gブレイバー バースト${wbr}ON！！`,
    );
  });
