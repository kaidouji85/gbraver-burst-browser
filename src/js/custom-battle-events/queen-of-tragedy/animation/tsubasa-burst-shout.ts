import { onStart } from "../../../animation/on-start";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ バースト 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaBurstShout = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Tsubasa", `これで終わりではないぞ ユウヤ`);
  });
