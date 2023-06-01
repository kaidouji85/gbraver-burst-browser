import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * 5以上で攻撃する
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export async function shouldAttack5OrMore(
  props: Readonly<CustomBattleEventProps>
): Promise<void> {
  await scrollLeftMessages(props, [
    ["ツバサ", "「これでシンブレイバーの攻撃力が底上げされた"],
    ["いまなら 3攻撃以上で私を倒せるはずだ」"]
  ]);
}