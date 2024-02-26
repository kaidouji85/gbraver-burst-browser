import { Animate } from "../../animation/animate";
import {
  BatteryCommandSelected,
  CommandCanceled,
  CustomBattleEvent,
  CustomStateAnimation,
  LastState,
} from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";
import { afterLastState } from "./procedures/after-last-state";
import { afterStateAnimation } from "./procedures/after-state-animation";
import { beforeLastState as beforeLastState } from "./procedures/before-last-state";
import { onBatteryCommandSelected } from "./procedures/on-battery-command-selected";
import { onStateAnimation } from "./procedures/on-state-animation";
import {
  createPilotSkillTutorial01Props,
  PilotSkillTutorial01Props,
} from "./props";

/** パイロットスキルチュートリアル（前半） */
class PilotSkillTutorial01 extends EmptyCustomBattleEvent {
  /** プロパティ */
  props: PilotSkillTutorial01Props;

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.props = createPilotSkillTutorial01Props();
  }

  /** @override */
  onStateAnimation(props: CustomStateAnimation): Animate {
    return onStateAnimation({ ...props, ...this.props });
  }

  /** @override */
  afterStateAnimation(props: CustomStateAnimation): Animate {
    return afterStateAnimation(props);
  }

  /** @override */
  async beforeLastState(props: LastState): Promise<void> {
    this.props.state = await beforeLastState({ ...props, ...this.props });
  }

  /** @override */
  async afterLastState(props: LastState): Promise<void> {
    this.props.state = await afterLastState({ ...props, ...this.props });
  }

  /** @override */
  async onBatteryCommandSelected(
    props: BatteryCommandSelected,
  ): Promise<CommandCanceled> {
    const { cancel, state } = await onBatteryCommandSelected({
      ...props,
      ...this.props,
    });
    this.props.state = state;
    return cancel;
  }
}

/**
 * パイロットスキルチュートリアル（前半）用のカスタムバトルイベントを作成する
 * @return 生成したカスタムバトルイベント
 */
export function createPilotSkillTutorial01Event(): CustomBattleEvent {
  return new PilotSkillTutorial01();
}
