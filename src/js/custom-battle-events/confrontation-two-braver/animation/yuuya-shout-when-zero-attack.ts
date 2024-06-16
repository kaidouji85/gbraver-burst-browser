import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * 0攻撃 ユウヤ 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaShoutWhenZeroAttack = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Yuuya",
      `バカな この俺が${wbr}押されている${wbr}だと`,
    );
  });
