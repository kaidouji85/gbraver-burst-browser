import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ガイ 戦闘 ガード 敵がダメージを受けている 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const gaiBattleShoutWhenGuardAndEnemyDamaged = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Gai",
      `いいぞ 確実に${wbr}ダメージが${wbr}蓄積して${wbr}きて${wbr}いる`,
    );
  });
