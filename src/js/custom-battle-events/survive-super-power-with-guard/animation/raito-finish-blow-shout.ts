import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ライト とどめ  叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const raitoFinishBlowShout = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Raito", `この勝負${wbr}もろたで ツバサ`);
  });
