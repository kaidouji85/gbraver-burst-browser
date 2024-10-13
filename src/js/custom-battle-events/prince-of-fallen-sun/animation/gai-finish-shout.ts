import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { enemyPilotOnlyShout } from "../../pilot-shout";

/**
 * ガイ トドメの一撃 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const gaiFinishShout = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    enemyPilotOnlyShout(props, "Gai", `これで${wbr}終わりだ`);
  });
