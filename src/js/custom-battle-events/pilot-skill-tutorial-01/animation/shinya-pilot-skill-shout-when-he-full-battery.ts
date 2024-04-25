import { onStart } from "../../../animation/on-start";
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
    playerPilotOnlyShout(props, "Shinya", "ここは様子見ッス");
  });
