import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ ファーストアタック 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaFirstAttackShout = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Tsubasa", `あの新型 ……なんて${wbr}図体だ`);
  });
