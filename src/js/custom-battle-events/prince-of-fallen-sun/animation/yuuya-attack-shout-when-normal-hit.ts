import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ユウヤ 攻撃ヒット 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaAttackShoutWhenNormalHit = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    playerPilotOnlyShout(
      props,
      "Yuuya",
      `どうした 足元が${wbr}おぼつかないぞ`,
    );
  });
