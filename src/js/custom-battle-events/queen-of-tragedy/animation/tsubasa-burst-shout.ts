import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ バースト 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaBurstShout = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Tsubasa",
      `これで${wbr}終わりでは${wbr}ないぞ ユウヤ`,
    );
  });
