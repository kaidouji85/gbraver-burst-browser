import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ガイ 戦闘 ガード
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const gaiBattleShoutWhenGuard = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Gai",
      `いいぞ ダメージが${wbr}確実に${wbr}蓄積している`,
    );
  });
