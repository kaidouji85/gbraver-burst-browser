import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ 攻撃ターンのバースト 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaAttackTurnBurstShout = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Tsubasa", `連続攻撃を${wbr}仕掛ける`);
  });
