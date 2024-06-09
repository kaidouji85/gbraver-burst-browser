import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ パイロットスキル 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaFirstAttackShout = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Tsubasa",
      `去年の${wbr}私と${wbr}同じと${wbr}思うな`,
    );
  });
