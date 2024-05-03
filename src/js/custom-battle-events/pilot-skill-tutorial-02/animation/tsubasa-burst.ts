import { onStart } from "../../../animation/on-start";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ バースト 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaBurst = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Tsubasa", "さすがガイ君 すごい気迫だ");
  });
