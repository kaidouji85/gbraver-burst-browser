import { wbr } from "../../../dom/wbr";
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
    [
      "ツバサ",
      `「すごいぞ${wbr}シンヤ${wbr} さっそく${wbr}実戦で${wbr}バーストを${wbr}発動${wbr}させたのか`,
    ],
    [`バーストは${wbr}一試合に${wbr}一回だけ${wbr}使える${wbr}大技で`],
    [
      `バッテリーを${wbr}回復しつつ${wbr} ロボ固有の${wbr}追加効果を${wbr}得る${wbr}ことができるんだ`,
    ],
    [
      `君の${wbr}搭乗機である${wbr}シンブレイバーは${wbr} 追加効果が${wbr}ない${wbr}代わりに`,
    ],
    [`バッテリーを${wbr}全回復${wbr}することが${wbr}できる`],
    [
      `使いこなせば${wbr} どんな相手とも${wbr}対等以上に${wbr}渡り合える${wbr} ともて${wbr}強力な${wbr}バーストだ」`,
    ],
  ]);
  invisibleAllMessageWindows(props);
}
