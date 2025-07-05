import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
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
    playerPilotOnlyShout(
      props,
      "Tsubasa",
      `また${wbr}私の${wbr}勝ちだな ライト`,
    );
  });
