import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ユウヤ ファーストアタック 叫び2
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaFirstAttackShout2 = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Yuuya", `面白い${wbr}展開に${wbr}なったな`);
  });
