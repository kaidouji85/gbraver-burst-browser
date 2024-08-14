import { onStart } from "../../../animation/on-start";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ フェイント成功(2回目) 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaFeintSuccessShoutOnSecond = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Tsubasa", `また かかったな`);
  });
