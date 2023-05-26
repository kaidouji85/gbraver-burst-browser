import { CustomBattleEvent, CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * 序盤
 * @param props イベントプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function introduction(
  props: Readonly<CustomBattleEventProps>
): Promise<void> {
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「これより摸擬戦を行う"],
    ["姿勢を正して 礼!!」"],
  ]);
}