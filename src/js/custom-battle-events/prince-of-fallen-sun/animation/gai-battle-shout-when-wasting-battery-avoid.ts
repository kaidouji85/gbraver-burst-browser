import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ガイ 戦闘 無駄にバッテリーを使って回避
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const gaiBattleShoutWhenWastingBatteryAvoid = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Gai", `よし バッテリーを${wbr}消耗させたぞ`);
  });
