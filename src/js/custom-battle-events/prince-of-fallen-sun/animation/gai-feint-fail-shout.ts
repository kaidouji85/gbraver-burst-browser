import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ガイ フェイント失敗 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const gaiFeintFailShout = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    enemyPilotOnlyShout(
      props,
      "Gai",
      `バカな フェイントを${wbr}見破る${wbr}だと`,
    );
  });
