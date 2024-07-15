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
      `それを${wbr}長期戦に${wbr}持ち${wbr}込むとは`,
    );
  });
