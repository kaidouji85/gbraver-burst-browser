import { process } from "../../../animation/process";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * トドメの一撃 ユウヤ 叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const yuuyaShoutWhenHeDeliversFinalBlow = (
  props: Readonly<CustomBattleEventProps>,
) =>
  process(() => {
    enemyPilotOnlyShout(props, "Yuuya", "これで終わりだ シンブレイバー");
  });
