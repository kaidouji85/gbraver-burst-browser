import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ユウヤ セカンドアタック失敗 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaSecondAttackFailShout = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Yuuya", `すばらしい さすがは${wbr}創業家だ`);
  });
