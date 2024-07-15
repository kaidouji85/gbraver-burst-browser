import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ 攻撃 叫び2（ツバサ不利）
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaAttackShout2WhenSheHasDisadvantage = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Tsubasa", `さすがは${wbr}ユウヤ`);
  });
