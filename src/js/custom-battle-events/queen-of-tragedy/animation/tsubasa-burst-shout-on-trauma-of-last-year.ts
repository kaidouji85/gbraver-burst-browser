import { onStart } from "../../../animation/on-start";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";
import {wbr} from "../../../dom/wbr";

/**
 * ツバサ バースト 叫び（一年前のトラウマ）
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaBurstShoutOnTraumaOfLastYear = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Tsubasa", `それは${wbr}どうかな ユウヤ`);
  });
