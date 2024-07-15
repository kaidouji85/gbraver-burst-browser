import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ 攻撃 叫び（ツバサ有利）
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaAttackShoutWhenSheHasAdvantage = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Tsubasa", `このまま${wbr}押し切るぞ ユウヤ`);
  });
