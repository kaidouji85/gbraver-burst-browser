import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ 4回目攻撃 叫び1
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaFourthAttackShout1 = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Tsubasa", `人の心配を${wbr}する前に`);
  });
