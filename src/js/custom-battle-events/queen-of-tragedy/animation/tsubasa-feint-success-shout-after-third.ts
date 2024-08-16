import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ フェイント成功(3回目以降) 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaFeintSuccessShoutAfterThird = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Tsubasa",
      `どうした${wbr}ユウヤ お前${wbr}らしく${wbr}ないな`,
    );
  });