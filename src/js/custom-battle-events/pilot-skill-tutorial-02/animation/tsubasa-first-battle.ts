import { onStart } from "../../../animation/on-start";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ ファーストバトル
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaFirstBattle = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Tsubasa", "ではガイ君 遠慮なく行かせてもらう");
  });
