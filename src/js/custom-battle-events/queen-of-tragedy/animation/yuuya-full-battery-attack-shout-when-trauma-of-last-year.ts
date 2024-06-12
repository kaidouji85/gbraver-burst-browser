import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ユウヤ フルバッテリー攻撃 去年のトラウマ
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaFullBatteryAttackShoutWhenTraumaOfLastYear = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Yuuya", `これで${wbr}終わりだ`);
  });
