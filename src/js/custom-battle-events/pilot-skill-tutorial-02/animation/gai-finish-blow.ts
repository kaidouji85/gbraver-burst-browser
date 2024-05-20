import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ガイ トドメの一撃 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const gaiFinishBlow = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    playerPilotOnlyShout(
      props,
      "Gai",
      `やってやる${wbr} ……やって${wbr}やるぞ！！`,
    );
  });
