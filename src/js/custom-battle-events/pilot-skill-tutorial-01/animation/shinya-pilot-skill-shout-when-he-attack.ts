import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * シンヤ 自分が攻撃側でパイロットスキル 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const shinyaPilotSkillShoutWhenHeAttack = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Shinya", `攻撃バッテリーを${wbr}確保ッス`);
  });
