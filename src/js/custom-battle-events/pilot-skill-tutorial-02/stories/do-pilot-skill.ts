import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { focusInPilotButton } from "../../focus";
import { scrollLeftMessages } from "../../scroll-messages";
import { shouldPilotSkill } from "../captions";

/**
 * パイロットスキル発動を推奨
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function doPilotSkill(
  props: Readonly<CustomBattleEventProps>,
): Promise<void> {
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「いまだガイ君 パイロットスキル発動だ」"],
  ]);
  await focusInPilotButton(props, shouldPilotSkill);
}
