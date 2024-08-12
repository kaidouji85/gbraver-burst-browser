import { onStart } from "../../../animation/on-start";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ガイ パイロットスキル 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const gaiPilotSkillShout = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Gai", `勝負だ Gブレイバー`);
  });
