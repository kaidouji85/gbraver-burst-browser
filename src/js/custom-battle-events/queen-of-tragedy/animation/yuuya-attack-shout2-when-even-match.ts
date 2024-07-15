import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ユウヤ 攻撃 叫び2（イーブンマッチ）
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaAttackShout2WhenEvenMatch = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Yuuya", `やるな${wbr}ツバサ`);
  });
