import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ 先攻時に0攻撃 叫び（リトライ用）
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaZeroAttackOnFirstAttackForRetry = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Tsubasa", `今は${wbr}守りに${wbr}集中だ`);
  });
