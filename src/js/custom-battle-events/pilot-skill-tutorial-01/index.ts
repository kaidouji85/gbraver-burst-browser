import { Animate } from "../../animation/animate";
import {
  CustomBattleEvent,
  CustomStateAnimation,
  LastState,
} from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";
import { afterLastState } from "./listeners/after-last-state";
import { beforeLastState as beforeLastState } from "./listeners/before-last-state";
import { onStateAnimation } from "./listeners/on-state-animation";
import { PilotSkillTutorial01State } from "./state";
import {afterStateAnimation} from "./listeners/after-state-animation";

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
      isIntroductionComplete: false,
      isGaiInspectingComplete: false,
    };
  }

  /** @override */
  onStateAnimation(props: CustomStateAnimation): Animate {
    return onStateAnimation(props);
  }

  /** @override */
  afterStateAnimation(props: CustomStateAnimation): Animate {
    return afterStateAnimation(props);
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
