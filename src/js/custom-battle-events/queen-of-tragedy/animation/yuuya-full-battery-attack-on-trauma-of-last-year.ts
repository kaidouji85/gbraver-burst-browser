import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ユウヤ フルバッテリー攻撃 2ターン目
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaFullBatteryAttackOnTraumaOfLastYear = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Yuuya", `ツバサ これで${wbr}終わりだ`);
  });