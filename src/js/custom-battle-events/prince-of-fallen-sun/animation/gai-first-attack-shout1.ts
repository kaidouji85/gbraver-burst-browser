import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ガイ ファーストアタック 叫び1
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const gaiFirstAttackShout1 = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Gai", `さすが${wbr}Gブレイバー`);
  });
