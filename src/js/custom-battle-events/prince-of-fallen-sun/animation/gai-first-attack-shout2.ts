import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ガイ ファーストアタック 叫び2
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const gaiFirstAttackShout2 = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Gai", `何て${wbr}バッテリー量だ`);
  });
