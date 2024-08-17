import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ユウヤ ファーストバトルでフェイント 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaFeintShoutWhenFirstBattle = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Yuuya", `まずは${wbr}お手なみ${wbr}拝見`);
  });
