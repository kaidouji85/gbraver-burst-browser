import { onStart } from "../../../animation/on-start";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * シンヤ ファーストアタック 叫び1
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaFirstAttackShout1 = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Shinya", "0防御で即死だと思ったのに");
  });
