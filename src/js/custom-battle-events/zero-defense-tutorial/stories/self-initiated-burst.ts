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
    ["ツバサ", "「すごいぞシンヤ さっそく実戦でバーストを発動させたのか"],
    ["バーストは一試合に一回だけ使える大技で"],
    ["バッテリーを回復しつつ ロボ固有の追加効果を得ることができるんだ"],
    ["君の搭乗機であるシンブレイバーは 追加効果がない代わりに"],
    ["バッテリーを全回復することができる"],
    ["使いこなせば どんな相手とも対等以上に渡り合える ともて強力なバーストだ」"],
  ]);
  invisibleAllMessageWindows(props);
}
