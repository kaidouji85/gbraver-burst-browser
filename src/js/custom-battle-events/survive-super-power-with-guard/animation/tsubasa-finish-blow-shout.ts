import { onStart } from "../../../animation/on-start";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ とどめの一撃 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaFinishBlowShout = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(props, "Tsubasa", `私の勝ちだ ライト`);
  });
