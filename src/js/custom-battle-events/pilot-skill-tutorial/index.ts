import { CustomBattleEvent } from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";

/**
 * パイロットスキルチュートリアル用のカスタムバトルイベントを作成する
 * @return 生成したカスタムバトルイベント
 */
export function createPilotSkillTutorialEvent(): CustomBattleEvent {
  return new EmptyCustomBattleEvent();
}
