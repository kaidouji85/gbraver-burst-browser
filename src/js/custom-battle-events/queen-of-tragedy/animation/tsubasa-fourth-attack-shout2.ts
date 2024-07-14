import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ 4回目攻撃 叫び2
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaFourthAttackShout2 = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Tsubasa",
      `自分の${wbr}心配を${wbr}したら${wbr}どうなんだ${wbr}ユウヤ`,
    );
  });
