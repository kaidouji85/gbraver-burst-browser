import { onStart } from "../../../animation/on-start";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * トドメの一撃 ユウヤ 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaShoutWhenHeDeliversFinalBlow = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Yuuya", "これで終わりだ シンブレイバー");
  });
