import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotCry } from "../../pilot-cry";

/**
 * イーブンマッチ シンヤ パイロットスキル
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaPilotSkillWhenYuuyaHasAdvantage = (
  props: Readonly<CustomBattleEventProps>,
) => playerPilotCry(props, "Shinya", "ユウヤさん 勝負はここからッスよ");
