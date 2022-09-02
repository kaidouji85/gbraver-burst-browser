// @flow
import type {CustomBattleEvent} from "../game/td-scenes/battle/custom-battle-event";
import {EmptyCustomBattleEvent} from "./empty-custom-battle-event";

/**
 * バーストチュートリアル用のカスタムバトルイベントを生成する
 * 
 * @return 生成したカスタムバトルイベント
 */
export function createBurstTutorialEvent(): CustomBattleEvent {
  return new EmptyCustomBattleEvent();
}