import { onStart } from "../../../animation/on-start";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ先輩 バースト 叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const tsubasaBurstShout = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Tsubasa", "0防御の隙をバーストでカバーだ");
  });
