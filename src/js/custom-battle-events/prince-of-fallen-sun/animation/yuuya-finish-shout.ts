import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ユウヤ とどめ 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaFinishShout = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Yuuya", `どうだ 創業家に${wbr}勝ったぞ`);
  });
