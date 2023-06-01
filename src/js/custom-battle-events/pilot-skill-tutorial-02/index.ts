import { CustomBattleEvent, LastState } from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";
import { beforeLastState } from "./listeners/before-last-state";
import { PilotSkillTutorial02State } from "./state";

/** パイロットスキルチュートリアル（後半）イベント */
class PilotSkillTutorial02 extends EmptyCustomBattleEvent {
  /** ステート */
  #state: PilotSkillTutorial02State;

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.#state = {
      isIntroductionComplete: false,
      isDoPilotSkillComplete: false,
    };
  }

  /** @override */
  async beforeLastState(props: LastState): Promise<void> {
    this.#state = await beforeLastState(props, this.#state);
  }
}

/**
 * パイロットスキルチュートリアル（後半）用のカスタムバトルイベントを作成する
 * @return 生成したカスタムバトルイベント
 */
export function createPilotSkillTutorial02Event(): CustomBattleEvent {
  return new PilotSkillTutorial02();
}
