import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ セカンドアタック 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaSecondAttackShout = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(
      props,
      "Tsubasa",
      `さすがライト 攻守${wbr}ともに${wbr}隙がない`,
    );
  });
