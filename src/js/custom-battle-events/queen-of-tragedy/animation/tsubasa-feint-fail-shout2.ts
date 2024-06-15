import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ フェイント失敗 叫び2
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaFeintFailShout2 = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Tsubasa", `小細工は${wbr}通用${wbr}しないか`);
  });
