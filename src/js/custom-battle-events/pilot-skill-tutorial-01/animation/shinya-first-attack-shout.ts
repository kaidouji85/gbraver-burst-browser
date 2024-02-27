import { onStart } from "../../../animation/on-start";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * シンヤ ファーストアタック 叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaFirstAttackShout = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Shinya", "そんな 0防御だと思ったのに！？");
  });
