import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ユウヤ ガード 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaBattleShoutWhenGuard = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Yuuya", `ガード${wbr}されたか やるなガイ`);
  });
