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
    enemyPilotOnlyShout(
      props,
      "Gai",
      `お前を${wbr}倒して うちが${wbr}トップに${wbr}返り咲く`,
    );
  });
