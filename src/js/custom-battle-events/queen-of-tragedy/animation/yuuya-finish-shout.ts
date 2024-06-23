import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ユウヤ トドメの一撃 叫び1
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaFinishShout = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Yuuya", `また${wbr}俺の${wbr}勝ちだな ツバサ`);
  });
