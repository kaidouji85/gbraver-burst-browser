import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ユウヤ セカンドアタック 叫び2
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaSecondAttackShout2 = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Yuuya", `さあ 次は${wbr}どう出る${wbr}ツバサ`);
  });
