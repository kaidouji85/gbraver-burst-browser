import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * シンヤ 自分が防御側でパイロットスキル 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const shinyaPilotSkillShoutWhenHeDefense = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(
      props,
      "Shinya",
      `そうは${wbr}問屋が${wbr}卸さない${wbr}ッスよ${wbr} ツバサ先輩`,
    );
  });
