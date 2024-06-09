import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ユウヤ バースト 叫び 去年のトラウマ
 * @param props
 */
export const yuuyaBurstShoutWhenLastYearTrauma = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(
      props,
      "Yuuya",
      `どうだ 去年の${wbr}トラウマが${wbr}蘇ったか`,
    );
  });
