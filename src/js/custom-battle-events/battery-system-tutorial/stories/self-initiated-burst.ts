import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * プレイヤーが自主的にバーストを発動した
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function selfInitiatedBurst(
  props: Readonly<CustomBattleEventProps>,
): Promise<void> {
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「素晴らしいぞシンヤ さっそくバーストを試したのか"],
    ["バーストは一試合に一回だけ使える大技で"],
    ["ターン消費なしでバッテリーを大幅回復できるんだ"],
    ["さらにロボ毎に固有の追加効果もあるが それは追々解説しよう」"],
  ]);
  invisibleAllMessageWindows(props);
}
