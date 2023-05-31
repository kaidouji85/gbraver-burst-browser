import { CustomBattleEvent } from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";

/**
 * パイロットスキルチュートリアル（後半）用のカスタムバトルイベントを作成する
 * @return 生成したカスタムバトルイベント
 */
export function createPilotSkillTutorial02Event(): CustomBattleEvent {
  return new EmptyCustomBattleEvent();
}
