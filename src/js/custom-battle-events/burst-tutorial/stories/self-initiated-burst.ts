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
    ["ツバサ", `「いま${wbr}君が${wbr}発動したのは${wbr}バーストと${wbr}いい`],
    [
      `一試合に${wbr}一回だけ${wbr}バッテリー回復を${wbr}しつつ${wbr} ロボ固有の${wbr}追加効果を${wbr}得られるんだ`,
    ],
    [
      `シンブレイバーに${wbr}追加効果は${wbr}ないが${wbr} バッテリーを${wbr}全回復${wbr}することが${wbr}できる`,
    ],
    [`使いこなせば${wbr} どんな${wbr}相手とも${wbr}渡り${wbr}合えるぞ」`],
  ]);
  invisibleAllMessageWindows(props);
}
