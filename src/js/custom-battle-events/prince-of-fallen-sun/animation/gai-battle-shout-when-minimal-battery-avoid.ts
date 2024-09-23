import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ガイ 戦闘 最低限のバッテリーで回避
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const gaiBattleShoutWhenMinimalBatteryAvoid = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Gai", `クッ 最小限で${wbr}躱された`);
  });
