import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotShout } from "../../pilot-shout";

/**
 * イーブンマッチ シンヤ パイロットスキル
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaPilotSkillWhenYuuyaHasAdvantage = (
  props: Readonly<CustomBattleEventProps>,
) => playerPilotShout(props, "Shinya", "ユウヤさん 勝負はここからッスよ");
