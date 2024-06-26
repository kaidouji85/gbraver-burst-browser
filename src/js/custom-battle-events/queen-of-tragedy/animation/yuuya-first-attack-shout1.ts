import { onStart } from "../../../animation/on-start";
import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * ユウヤ ファーストアタック 叫び1
 * @param props イベントプロパティ
 * @returns アニメーション
 */
export const yuuyaFirstAttackShout1 = (
  props: Readonly<CustomBattleEventProps>,
) =>
  onStart(() => {
    playerPilotOnlyShout(
      props,
      "Yuuya",
      `去年から${wbr}どれほど${wbr}腕が${wbr}あがったか`,
    );
  });
