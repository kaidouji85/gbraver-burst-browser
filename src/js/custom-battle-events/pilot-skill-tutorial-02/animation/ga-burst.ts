import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ガイ バースト 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const gaiBurst = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    playerPilotOnlyShout(
      props,
      "Gai",
      `これが${wbr}シンブレイバーの${wbr}バースト${wbr}……`,
    );
  });
