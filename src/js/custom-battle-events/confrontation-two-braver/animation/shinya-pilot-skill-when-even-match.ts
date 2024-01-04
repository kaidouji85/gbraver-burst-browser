import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { switchPlayerPilotCry } from "../../pilot-cry";

/**
 * イーブンマッチ シンヤ パイロットスキル
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaPilotSkillWhenEvenMatch = (
  props: Readonly<CustomBattleEventProps>,
) => switchPlayerPilotCry(props, "Shinya", "ここで勝負をかけるッス");
