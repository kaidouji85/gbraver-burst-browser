import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ 防御ターンのバースト 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaDefenseTurnBurstShout = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Tsubasa", `防御バッテリーを${wbr}確保だ`);
  });
