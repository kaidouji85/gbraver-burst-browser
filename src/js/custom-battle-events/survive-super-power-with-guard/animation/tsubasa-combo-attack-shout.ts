import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ 連続攻撃 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaComboAttackShout = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(
      props,
      "Tsubasa",
      `私の${wbr}攻撃は まだ${wbr}終わって${wbr}いない`,
    );
  });
