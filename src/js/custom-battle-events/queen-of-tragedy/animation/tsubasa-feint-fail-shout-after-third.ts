import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ フェイント失敗（3回目以降） 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaFeintFailShoutAfterThird = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Tsubasa",
      `ユウヤに${wbr}0攻撃は${wbr}通用しない${wbr}のか`,
    );
  });
