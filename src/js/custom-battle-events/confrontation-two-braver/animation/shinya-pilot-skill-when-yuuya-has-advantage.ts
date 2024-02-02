import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { playerPilotOnlyShout } from "../../pilot-shout";

/**
 * イーブンマッチ シンヤ パイロットスキル
 * @param props イベントプロパティ
 * @return アニメーション
 */
export const shinyaPilotSkillWhenYuuyaHasAdvantage = (
  props: Readonly<CustomBattleEventProps>,
) => playerPilotOnlyShout(props, "Shinya", "ユウヤさん 勝負はここからッスよ");
