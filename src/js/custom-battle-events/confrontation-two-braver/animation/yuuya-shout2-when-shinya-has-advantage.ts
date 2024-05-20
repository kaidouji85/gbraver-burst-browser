import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * チャプター シンヤ有利 ユウヤ叫び2
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaShout2WhenShinyaHasAdvantage = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Yuuya", `Gブレイバーを${wbr}舐めるな`);
  });
