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
    ["ツバサ", `「素晴らしいぞ${wbr}シンヤ さっそくバーストを${wbr}試したのか`],
    [`バーストは${wbr}一試合に${wbr}一回だけ${wbr}使える大技で`],
    [`ターン消費${wbr}なしで${wbr}バッテリーを${wbr}大幅回復${wbr}できるんだ`],
    [
      `さらに${wbr}ロボ毎に${wbr}固有の追加効果も${wbr}あるが それは追々解説${wbr}しよう」`,
    ],
  ]);
  invisibleAllMessageWindows(props);
}
