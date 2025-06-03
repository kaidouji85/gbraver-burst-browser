import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ パイロットスキル 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaPilotSkillShout = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(
      props,
      "Tsubasa",
      `少し無茶を${wbr}するぞ ウィングドーザ`,
    );
  });
