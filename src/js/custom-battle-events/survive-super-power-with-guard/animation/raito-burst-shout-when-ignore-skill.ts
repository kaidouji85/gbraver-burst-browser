import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ライト バースト パイロットスキル無効化 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const raitoBurstShoutWhenIgnoreSkill = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Raito",
      `あんさんの${wbr}スキルは${wbr}封じたで`,
    );
  });
