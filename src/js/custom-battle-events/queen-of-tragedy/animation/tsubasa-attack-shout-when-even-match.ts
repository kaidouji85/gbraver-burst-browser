import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ 攻撃 叫び（イーブンマッチ）
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaAttackShoutWhenEvenMatch = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Tsubasa",
      `勝負は${wbr}最後まで${wbr}わからないぞ ユウヤ`,
    );
  });
