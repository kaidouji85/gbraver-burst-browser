import { CustomBattleEvent } from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";

/** 落日の王子 イベント */
class PrinceOfFallenSun extends EmptyCustomBattleEvent {
  /**
   * コンストラクタ
   */
  constructor() {
    super();
  }
}

/**
 * 落日の王子イベント用のカスタムバトルイベントを作成する
 * @returns 生成結果
 */
export function createPrinceOfFallenSun(): CustomBattleEvent {
  return new PrinceOfFallenSun();
}
