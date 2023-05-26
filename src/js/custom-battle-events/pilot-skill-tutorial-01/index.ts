import { CustomBattleEvent, LastState } from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";
import { afterLastState } from "./listeners/after-last-state";

/** パイロットスキルチュートリアル（前半） */
class PilotSkillTutorial01 extends EmptyCustomBattleEvent {
  /**
   * コンストラクタ
   */
  constructor() {
    super();
  }

  /** @override */
  async afterLastState(props: LastState): Promise<void> {
    await afterLastState(props);
  }
}

/**
 * パイロットスキルチュートリアル（前半）用のカスタムバトルイベントを作成する
 * @return 生成したカスタムバトルイベント
 */
export function createPilotSkillTutorial01Event(): CustomBattleEvent {
  return new PilotSkillTutorial01();
}
