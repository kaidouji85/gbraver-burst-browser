import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ライト パイロットスキル 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const raitoPilotSkillShout = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Raito", `まだや まだ${wbr}終わらんで`);
  });
