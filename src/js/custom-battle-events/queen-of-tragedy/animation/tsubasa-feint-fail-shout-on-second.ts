import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ フェイント失敗（2回目） 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaFeintFailShoutOnSecond = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Tsubasa", `またしても${wbr}0攻撃${wbr}を`);
  });
