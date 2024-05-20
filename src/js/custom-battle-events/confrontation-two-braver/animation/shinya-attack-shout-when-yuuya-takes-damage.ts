import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * シンヤ 戦闘 ユウヤがダメージを受けた
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const shinyaAttackShoutWhenYuuyaTakesDamage = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(
      props,
      "Shinya",
      `あと一回${wbr}直撃させれば${wbr} 俺の${wbr}勝ちッス`,
    );
  });
