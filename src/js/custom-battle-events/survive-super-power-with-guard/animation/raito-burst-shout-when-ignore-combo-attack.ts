import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ライト バースト 2回行動無効化 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const raitoBurstShoutWhenIgnoreComboAttack = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Raito",
      `どや これで${wbr}2回行動は${wbr}できないで`,
    );
  });
