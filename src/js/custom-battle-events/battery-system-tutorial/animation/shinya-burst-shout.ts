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
      `シンブレイバーの${wbr}パワーが${wbr}急上昇${wbr}してるッス`,
    );
  });
