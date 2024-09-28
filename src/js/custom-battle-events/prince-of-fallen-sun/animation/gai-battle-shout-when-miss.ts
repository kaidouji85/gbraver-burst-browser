import { onStart } from "../../../animation/on-start";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ガイ 戦闘 ミス
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const gaiBattleShoutWhenMiss = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Gai", `外したか まあいい`);
  });
