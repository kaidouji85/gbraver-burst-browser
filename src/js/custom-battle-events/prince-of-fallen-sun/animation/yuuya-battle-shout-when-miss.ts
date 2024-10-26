import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ユウヤ 戦闘 ミス 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaBattleShoutWhenMiss = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(
      props,
      "Yuuya",
      `さすが${wbr}創業家 一筋縄では${wbr}いかないな`,
    );
  });
