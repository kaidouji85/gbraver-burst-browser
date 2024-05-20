import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * チャプター ユウヤ有利 ユウヤ叫び2
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaShout2WhenYuuyaHasAdvantage = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Yuuya",
      `それでは${wbr}ブレイバーの${wbr}名が${wbr}泣くぞ`,
    );
  });
