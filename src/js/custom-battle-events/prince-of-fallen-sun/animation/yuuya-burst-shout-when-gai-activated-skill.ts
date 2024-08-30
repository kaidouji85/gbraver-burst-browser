import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ユウヤ バースト（ガイがスキルを発動） 叫び
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaBurstShoutWhenGaiActivatedSkill = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(
      props,
      "Yuuya",
      `面白い 全力で${wbr}受けて${wbr}立つ`,
    );
  });
