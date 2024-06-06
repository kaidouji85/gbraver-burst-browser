import { CustomBattleEvent } from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";

/** 悲劇の女王 イベント */
class QueenOfTragedy extends EmptyCustomBattleEvent {}

/**
 * 悲劇の女王イベント用のカスタムバトルイベントを作成する
 * @returns 生成結果
 */
export function createQueenOfTragedy(): CustomBattleEvent {
  return new QueenOfTragedy();
}
