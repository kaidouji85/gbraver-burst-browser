import { onStart } from "../../../animation/on-start";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ライト とどめ プレイヤーバッテリー0 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const raitoFinishShoutWhenPlayerBattery0 = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Raito", `隙ありや ツバサ`);
  });
