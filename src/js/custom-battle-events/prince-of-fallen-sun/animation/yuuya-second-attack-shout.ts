import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ユウヤ セカンドアタック 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaSecondAttackShout = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(
      props,
      "Yuuya",
      `創業家の${wbr}力 見せて${wbr}もらうぞ`,
    );
  });
