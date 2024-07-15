import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ユウヤ セカンドアタック 叫び1
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaSecondAttackShout = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Yuuya", `後半戦に${wbr}突入だな どう出る${wbr}ツバサ`);
  });
