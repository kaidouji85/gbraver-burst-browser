import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ バースト 叫び 去年のトラウマ
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaBurstShoutWhenTraumaOfLastYear = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Tsubasa",
      `言ったはずだ 去年の${wbr}私とは${wbr}違うと`,
    );
  });
