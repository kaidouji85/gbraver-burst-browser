import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotCry } from "../../pilot-cry";

/**
 * シンヤ叫び 即死を避けるためにパイロットスキル発動
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaPilotSkillCryToAvoidDeath = (props: Readonly<CustomBattleEventProps>) =>
  playerPilotCry(props, "Shinya", "これで緊急回避ッス");
