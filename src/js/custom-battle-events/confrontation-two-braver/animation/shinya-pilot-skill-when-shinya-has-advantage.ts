import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * シンヤ有利 シンヤ パイロットスキル
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const shinyaPilotSkillWhenShinyaHasAdvantage = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(
      props,
      "Shinya",
      `このまま${wbr}リードを${wbr}保つッス`,
    );
  });
