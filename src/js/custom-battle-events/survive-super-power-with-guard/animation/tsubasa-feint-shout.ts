import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサフェイント 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaFeintShout = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Tsubasa", `いまのは${wbr}囮だ`);
  });
