import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ライト セカンドアタック 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const raitoSecondAttackShout = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Raito", `ここで${wbr}賭けに${wbr}出るで`);
  });
