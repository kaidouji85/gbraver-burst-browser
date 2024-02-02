import { process } from "../../../animation/process";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * 最初の戦闘 シンヤ 叫び
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaShoutWhenFirstBattle = (
  props: Readonly<CustomBattleEventProps>,
) =>
  process(() => {
    playerPilotOnlyShout(props, "Shinya", "いくッスよ ユウヤさん");
  });
