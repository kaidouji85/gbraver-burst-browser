import { onStart } from "../../../animation/on-start";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * シンヤ パイロットスキル 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const shinyaPilotSkillShout = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(
      props,
      "Shinya",
      "なぜか<wbr>無性に<wbr>やる気が<wbr>出てきたッス",
    );
  });
