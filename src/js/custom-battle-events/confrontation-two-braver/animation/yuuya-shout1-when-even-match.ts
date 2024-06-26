import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * チャプター イーブンマッチ ユウヤ叫び1
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaShout1WhenEvenMatch = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Yuuya", `それは${wbr}どうかな${wbr} シンヤ`);
  });
