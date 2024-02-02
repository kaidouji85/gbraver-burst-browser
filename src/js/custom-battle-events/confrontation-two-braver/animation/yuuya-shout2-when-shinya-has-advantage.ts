import { process } from "../../../animation/process";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * チャプター シンヤ有利 ユウヤ叫び2
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const yuuyaShout2WhenShinyaHasAdvantage = (
  props: Readonly<CustomBattleEventProps>,
) =>
  process(() => {
    enemyPilotOnlyShout(props, "Yuuya", "Gブレイバーを舐めるな");
  });
