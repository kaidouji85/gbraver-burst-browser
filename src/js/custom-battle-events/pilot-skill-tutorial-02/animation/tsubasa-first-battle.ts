import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ツバサ ファーストバトル
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const tsubasaFirstBattle = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Tsubasa",
      `では${wbr}ガイ君${wbr} 遠慮なく${wbr}行かせて${wbr}もらう`,
    );
  });
