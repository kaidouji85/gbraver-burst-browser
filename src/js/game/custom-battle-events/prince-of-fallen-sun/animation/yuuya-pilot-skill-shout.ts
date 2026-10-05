import { onStart } from "../../../../animation/on-start";
import { wbr } from "../../../../dom/wbr";
import { CustomBattleEventProps } from "../../../scenes/td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ユウヤ パイロットスキル 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaPilotSkillShout = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Yuuya", `こうなれば${wbr}奥の手だ`);
  });
