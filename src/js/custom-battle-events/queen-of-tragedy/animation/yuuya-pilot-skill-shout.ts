import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ユウヤ パイロットスキル 叫び
 * @param props
 */
export const yuuyaPilotSkillShout = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Yuuya", `こうなれば${wbr}奥の手を${wbr}使う`);
  });
