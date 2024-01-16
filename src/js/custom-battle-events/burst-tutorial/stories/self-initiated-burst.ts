import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * プレイヤーが自主的にバーストを発動した
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export async function selfInitiatedBurst(
  props: Readonly<CustomBattleEventProps>,
): Promise<void> {
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「今 君が発動したのはバーストといい"],
    [
      "一試合に一回だけバッテリー回復をしつつ ロボ固有の追加効果を得られるんだ",
    ],
    ["シンブレイバーに追加効果はないが バッテリーを全回復することができる"],
    ["使いこなせば どんな相手とも渡り合えるぞ」"],
  ]);
  invisibleAllMessageWindows(props);
}
