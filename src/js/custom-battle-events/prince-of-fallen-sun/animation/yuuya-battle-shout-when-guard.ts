import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ユウヤ 戦闘 ガード 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaBattleShoutWhenGuard = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(
      props,
      "Yuuya",
      `この耐久力 さすがは${wbr}創業家${wbr}謹製の${wbr}ロボだ`,
    );
  });
