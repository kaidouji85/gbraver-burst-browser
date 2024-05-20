import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * シンヤ バースト 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const shinyaBurstShout = (props: Readonly<CustomBattleEventProps>) =>
  onStart(() => {
    playerPilotOnlyShout(
      props,
      "Shinya",
      `ユウヤさん${wbr} これで${wbr}決めさせて${wbr}もらうッス`,
    );
  });
