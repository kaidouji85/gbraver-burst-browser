import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ガイ パイロットスキル叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const gaiPilotSkill = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Gai", `俺の${wbr}根性${wbr} 見せて${wbr}やる`);
  });
