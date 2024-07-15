import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ 攻撃 叫び1（ツバサ不利）
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaAttackShout1WhenSheHasDisadvantage = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Tsubasa",
      `まだ${wbr}リードを${wbr}保つ${wbr}とは`,
    );
  });
