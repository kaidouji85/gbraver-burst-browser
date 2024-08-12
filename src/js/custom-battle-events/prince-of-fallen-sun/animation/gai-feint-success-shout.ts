import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ガイ フェイント成功 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const gaiFeintSuccessShout = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Gai", `攻撃すると${wbr}思ったか Gブレイバー`);
  });
