import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * シンヤ 戦闘 ユウヤのHPが満タン
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const shinyaAttackShoutWhenYuuyaHPIsFull = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(
      props,
      "Shinya",
      `まだ${wbr}ノーダメージ${wbr}なんて さすが${wbr}ユウヤさん${wbr}ッス`,
    );
  });
