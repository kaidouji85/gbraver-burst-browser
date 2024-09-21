import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ユウヤ ファーストアタック 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaFirstAttackShout = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(
      props,
      "Yuuya",
      `ガイ お前${wbr}とは${wbr}初対面の${wbr}はず${wbr}だが`,
    );
  });
