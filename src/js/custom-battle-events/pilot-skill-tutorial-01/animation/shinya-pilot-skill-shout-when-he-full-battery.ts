import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * シンヤ バッテリー満タンでパイロットスキル 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const shinyaPilotSkillShoutWhenHeFullBattery = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Shinya", `ここは${wbr}様子見${wbr}ッス`);
  });
