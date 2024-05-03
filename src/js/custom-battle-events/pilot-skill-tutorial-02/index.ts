import { Animate } from "../../animation/animate";
import {
  BatteryCommandSelected,
  CommandCanceled,
  CustomBattleEvent,
  CustomStateAnimation,
  LastState,
  PilotSkillCommandSelected,
} from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";
import { afterLastState } from "./procedures/after-last-state";
import { beforeLastState } from "./procedures/before-last-state";
import { onBatteryCommandSelected } from "./procedures/on-battery-command-selected";
import { onPilotSkillCommandSelected } from "./procedures/on-pilot-skill-command-selected";
import { onStateAnimation } from "./procedures/on-state-animation";
import {
  createPilotSkillTutorial02Props,
  PilotSkillTutorial02Props,
} from "./props";

/** パイロットスキルチュートリアル（後半）イベント */
class PilotSkillTutorial02 extends EmptyCustomBattleEvent {
  /** プロパティ */
  props: PilotSkillTutorial02Props;

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.props = createPilotSkillTutorial02Props();
  }

  /** @override */
  onStateAnimation(props: CustomStateAnimation): Animate {
    return onStateAnimation({...props, ...this.props});
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
    const { state, cancel } = await onBatteryCommandSelected({
      ...props,
      ...this.props,
    });
    this.props.state = state;
    return cancel;
  }

  /** @override */
  async onPilotSkillCommandSelected(
    props: PilotSkillCommandSelected,
  ): Promise<CommandCanceled> {
    const { state, cancel } = await onPilotSkillCommandSelected({
      ...props,
      ...this.props,
    });
    this.props.state = state;
    return cancel;
  }
}

/**
 * パイロットスキルチュートリアル（後半）用のカスタムバトルイベントを作成する
 * @returns 生成したカスタムバトルイベント
 */
export function createPilotSkillTutorial02Event(): CustomBattleEvent {
  return new PilotSkillTutorial02();
}
