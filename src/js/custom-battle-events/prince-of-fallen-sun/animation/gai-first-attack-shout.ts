import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ガイ ファーストアタック 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const gaiFirstAttackShout = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Gai",
      `さすが${wbr}Gブレイバー 反則的な${wbr}バッテリーだ`,
    );
  });
