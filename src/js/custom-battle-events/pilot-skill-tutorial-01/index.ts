import { CustomBattleEvent, LastState } from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";
import { beforeLastState as beforeLastState } from "./listeners/before-last-state";
import { PilotSkillTutorial01State } from "./state";
import {afterLastState} from "./listeners/after-last-state";

/** パイロットスキルチュートリアル（前半） */
class PilotSkillTutorial01 extends EmptyCustomBattleEvent {
  /** ステート */
  #state: PilotSkillTutorial01State;

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.#state = {
      stateHistory: [],
      isIntroductionComplete: false,
      isGaiInspectingComplete: false,
      isDeclarationVictoryComplete: false,
    };
  }

  /** @override */
  async beforeLastState(props: LastState): Promise<void> {
    this.#state = await beforeLastState(props, this.#state);
  }

  /** @override */
  async afterLastState(props: LastState): Promise<void> {
    this.#state = await afterLastState(props, this.#state);
  }
}

/**
 * パイロットスキルチュートリアル（前半）用のカスタムバトルイベントを作成する
 * @return 生成したカスタムバトルイベント
 */
export function createPilotSkillTutorial01Event(): CustomBattleEvent {
  return new PilotSkillTutorial01();
}
