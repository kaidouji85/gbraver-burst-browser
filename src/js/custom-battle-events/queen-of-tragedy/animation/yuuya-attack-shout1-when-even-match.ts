import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ユウヤ 攻撃 叫び1（イーブンマッチ）
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaAttackShout1WhenEvenMatch = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(
      props,
      "Yuuya",
      `たった一年で${wbr}ここまで${wbr}実力を${wbr}あげたか`,
    );
  });
