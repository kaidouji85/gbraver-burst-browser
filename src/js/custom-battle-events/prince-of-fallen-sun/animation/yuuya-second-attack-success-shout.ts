import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ユウヤ セカンドアタック成功 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaSecondAttackSuccessShout = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(
      props,
      "Yuuya",
      `どうした 創業家の${wbr}意地を${wbr}見せて${wbr}みろ`,
    );
  });
