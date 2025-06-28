import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ライト セカンドアタック 叫び1
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const raitoSecondAttackShout1 = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Raito",
      `こっちは${wbr}新型に${wbr}慣れて${wbr}ないんや`,
    );
  });

/**
 * ライト セカンドアタック 叫び2
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const raitoSecondAttackShout2 = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Raito",
      `少しは${wbr}手加減${wbr}しても${wbr}ええん${wbr}ちゃうか`,
    );
  });
