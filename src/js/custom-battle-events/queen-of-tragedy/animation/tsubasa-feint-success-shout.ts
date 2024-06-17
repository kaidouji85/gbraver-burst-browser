import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ フェイント成功 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaFeintSuccessShout = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Tsubasa", `かかったな${wbr}ユウヤ いまのは${wbr}囮だ`);
  });
