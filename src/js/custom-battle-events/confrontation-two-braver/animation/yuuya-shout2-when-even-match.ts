import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * チャプター イーブンマッチ ユウヤ叫び2
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaShout2WhenEvenMatch = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Yuuya",
      `Gブレイバーの${wbr}力${wbr} 見せてやる`,
    );
  });
