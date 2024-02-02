import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotShout } from "../../pilot-shout";

/**
 * トドメの一撃 ユウヤ 叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const yuuyaShoutWhenHeDeliversFinalBlow = (
  props: Readonly<CustomBattleEventProps>,
) => enemyPilotShout(props, "Yuuya", "これで終わりだ シンブレイバー");
