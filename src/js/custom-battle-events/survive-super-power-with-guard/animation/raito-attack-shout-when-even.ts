import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ライト 攻撃 イーブン 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const raitoAttackShoutWhenEven = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Raito",
      `この試合 どう${wbr}転ぶか${wbr}分からんで`,
    );
  });
