import { onStart } from "../../../animation/on-start";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * シンヤ ファーストアタック 叫び2
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaFirstAttackShout2 = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(
      props,
      "Shinya",
      "バーストにはこういう使い方もあるんスね",
    );
  });
