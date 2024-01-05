import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * プレイヤーが自主的にパイロットスキルを発動した
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export async function selfInitiatedPilotSkill(
  props: Readonly<CustomBattleEventProps>
): Promise<void> {
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「もうパイロットスキルを発動できるとは これは将来有望だな"],
    ["パイロットスキルは一試合に一回だけ使える技で"],
    ["パイロット毎に固有の効果を発動できる"],
    ["君のパイロットスキルは バッテリー2回復だ」"]
  ]);
}