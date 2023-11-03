import {CustomBattleEvent} from "../../td-scenes/battle/custom-battle-event";
import {EmptyCustomBattleEvent} from "../empty-custom-battle-event";

/**
 * 「対決、二人のブレイバー！！」のカスタムバトルイベントを生成する
 * @return 生成したカスタムバトルイベント
 */
export function createConfrontationTwoBraverEvent(): CustomBattleEvent {
  return new EmptyCustomBattleEvent();
}