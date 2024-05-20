import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * 序盤 シンヤ バースト 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const earlyShinyaBurstShout = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(
      props,
      "Shinya",
      `はじめから${wbr}飛ばすッスよ${wbr} ユウヤさん`,
    );
  });
