import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ユウヤ 攻撃 叫び（ユウヤ不利）
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaAttackShoutWhenHeHasDisadvantage = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Yuuya", `バカな この俺が${wbr}押されて${wbr}いるだと`);
  });
