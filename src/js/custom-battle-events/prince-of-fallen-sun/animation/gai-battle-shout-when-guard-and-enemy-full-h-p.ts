import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ガイ 戦闘 ガード 敵HPが満タン 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const gaiBattleShoutWhenGuardAndEnemyFullHP = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Gai",
      `まずは${wbr}一発だ`,
    );
  });
