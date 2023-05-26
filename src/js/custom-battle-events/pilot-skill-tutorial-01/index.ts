import { CustomBattleEvent } from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";

/**
 * パイロットスキルチュートリアル（前半）用のカスタムバトルイベントを作成する
 * @return 生成したカスタムバトルイベント
 */
export function createPilotSkillTutorial01Event(): CustomBattleEvent {
  return new EmptyCustomBattleEvent();
}
