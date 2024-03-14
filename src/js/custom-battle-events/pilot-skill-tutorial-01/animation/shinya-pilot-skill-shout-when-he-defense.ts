import { onStart } from "../../../animation/on-start";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * シンヤ 自分が防御側でパイロットスキル 叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaPilotSkillShoutWhenHeDefense = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Shinya", "そうは問屋が卸さないッスよ ツバサ先輩");
  });
