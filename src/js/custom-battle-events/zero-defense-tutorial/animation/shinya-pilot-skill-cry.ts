import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotShout } from "../../pilot-shout";

/**
 * シンヤ叫び パイロットスキル発動
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaPilotSkillCry = (props: Readonly<CustomBattleEventProps>) =>
  playerPilotShout(props, "Shinya", "うぉぉぉぉ 何故か叫びたくなってきたッス");
