import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { switchEnemyPilotCry } from "../../pilot-cry";

/**
 * トドメの一撃 ユウヤ 叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const yuuyaCryWhenHeDeliversFinalBlow = (
  props: Readonly<CustomBattleEventProps>,
) => switchEnemyPilotCry(props, "Yuuya", "これで終わりだ シンブレイバー");
