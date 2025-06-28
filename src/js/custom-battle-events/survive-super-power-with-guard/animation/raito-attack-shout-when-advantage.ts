import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ライト 攻撃 自分が有利 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const raitoAttackShoutWhenAdvantage = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Raito",
      `どうしたツバサ もう${wbr}虫の息${wbr}やないか`,
    );
  });
