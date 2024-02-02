import { process } from "../../../animation/process";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * チャプター ユウヤ有利 ユウヤ叫び2
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const yuuyaShout2WhenYuuyaHasAdvantage = (
  props: Readonly<CustomBattleEventProps>,
) =>
  process(() => {
    enemyPilotOnlyShout(props, "Yuuya", "それではブレイバーの名が泣くぞ");
  });
