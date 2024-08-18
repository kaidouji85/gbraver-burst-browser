import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ユウヤ バースト（1ターン目） 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaBurstShoutWhenOneTurn = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Yuuya", `はじめから${wbr}全力で${wbr}いくぞ`);
  });
