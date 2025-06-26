import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ガイ 戦闘 ヒット
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const gaiBattleShoutWhenHit = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Gai", `よし 手応え${wbr}ありだ`);
  });
