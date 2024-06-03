import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * 最初の戦闘 ユウヤ 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaShoutWhenFirstBattle = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Yuuya",
      `見せて${wbr}もらおうか${wbr} シンブレイバーの${wbr}実力を`,
    );
  });
