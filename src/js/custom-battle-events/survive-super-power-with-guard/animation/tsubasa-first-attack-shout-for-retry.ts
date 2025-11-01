import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ ファーストアタック 叫び（リトライ用）
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaFirstAttackShoutForRetry = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(
      props,
      "Tsubasa",
      `と思ったが 攻撃こそ${wbr}最大の${wbr}防御だ`,
    );
  });
