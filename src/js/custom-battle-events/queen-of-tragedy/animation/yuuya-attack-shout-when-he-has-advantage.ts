import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ユウヤ 攻撃 叫び1（ユウヤ有利）
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaAttackShoutWhenHeHasAdvantage = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(
      props,
      "Yuuya",
      `どうした${wbr}ツバサ ペースが${wbr}乱れてるぞ`,
    );
  });
