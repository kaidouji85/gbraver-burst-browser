import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { switchPlayerPilotCry } from "../../pilot-cry";

/**
 * イーブンマッチ シンヤ パイロットスキル
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaPilotSkillWhenYuuyaHasAdvantage = (
  props: Readonly<CustomBattleEventProps>,
) => switchPlayerPilotCry(props, "Shinya", "ユウヤさん 勝負はここからッスよ");
