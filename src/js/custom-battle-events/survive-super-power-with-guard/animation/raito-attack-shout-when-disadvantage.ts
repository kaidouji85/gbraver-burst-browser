import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ライト 攻撃 自分が不利 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const raitoAttackShoutWhenDisadvantage = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Raito",
      `さすがツバサ 全国2位は${wbr}伊達やない`,
    );
  });
