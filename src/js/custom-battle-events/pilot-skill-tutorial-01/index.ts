import { CustomBattleEvent, LastState } from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";
import { afterLastState as beforeLastState } from "./listeners/before-last-state";

/** パイロットスキルチュートリアル（前半） */
class PilotSkillTutorial01 extends EmptyCustomBattleEvent {
  /**
   * コンストラクタ
   */
  constructor() {
    super();
  }

  /** @override */
  async beforeLastState(props: LastState): Promise<void> {
    await beforeLastState(props);
  }
}

/**
 * パイロットスキルチュートリアル（前半）用のカスタムバトルイベントを作成する
 * @return 生成したカスタムバトルイベント
 */
export function createPilotSkillTutorial01Event(): CustomBattleEvent {
  return new PilotSkillTutorial01();
}
