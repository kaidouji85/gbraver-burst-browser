import { CustomBattleEvent } from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";

/** ネット対戦、アーケードなど真剣勝負のカスタムバトルイベント */
class SeriousMatchEvent extends EmptyCustomBattleEvent {
  /**
   * コンストラクタ
   */
  constructor() {
    super();
  }
}

/**
 * 真剣勝負のカスタムバトルイベントを生成する
 * @return 生成結果
 */
export function createSeriousMatchEvent(): CustomBattleEvent {
  return new SeriousMatchEvent();
}
