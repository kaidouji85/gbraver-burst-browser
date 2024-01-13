import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotCry } from "../../pilot-cry";

/**
 * シンヤ叫び パイロットスキル発動
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaPilotSkillCry = (props: Readonly<CustomBattleEventProps>) =>
  playerPilotCry(props, "Shinya", "うぉぉぉぉ 何故か叫びたくなってきたッス");
