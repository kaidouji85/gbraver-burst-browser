import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ先輩勝利宣言
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaVictoryDeclaration = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Tsubasa",
      `この瞬間${wbr} 私の${wbr}勝利が${wbr}確定した`,
    );
  });
