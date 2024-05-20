import { wbr } from "../../../dom/wbr";
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
    ["ツバサ", `「いまだ${wbr}ガイ君${wbr} パイロットスキル${wbr}発動だ」`],
  ]);
  await focusInPilotButton(props, shouldPilotSkill);
}
