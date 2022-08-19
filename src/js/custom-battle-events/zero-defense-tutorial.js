// @flow
import type {CustomBattleEvent} from "../game/td-scenes/battle/custom-battle-event";
import {EmptyCustomBattleEvent} from "./empty-custom-battle-event";

/**
 * ゼロ防御チュートリアル用のカスタムバトルイベントを生成する
 * 
 * @return 生成したカスタムバトルイベント
 */
export function createZeroDefenseTutorialEvent(): CustomBattleEvent {
  return new EmptyCustomBattleEvent();
}