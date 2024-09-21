import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ガイ セカンドアタック 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const gaiSecondAttackShout = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Gai", `なんて奴だ 一分の${wbr}隙もない`);
  });
