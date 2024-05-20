import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ライト バースト 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const raitoBurstShout = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Raito",
      `ほないくで${wbr} 大田高校の${wbr}エース君`,
    );
  });
