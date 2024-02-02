import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * シンヤ叫び パイロットスキル発動
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaPilotSkillShout = (
  props: Readonly<CustomBattleEventProps>,
) =>
  playerPilotOnlyShout(props, "Shinya", "うぉぉぉぉ 何故か叫びたくなってきたッス");
