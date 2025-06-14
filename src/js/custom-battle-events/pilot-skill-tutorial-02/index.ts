import { Animate } from "../../animation/animate";
import {
  BatteryCommandSelectedEventProps,
  CommandCanceled,
  CustomBattleEvent,
  CustomStateAnimationProps,
  LastStateEventProps,
  PilotSkillSelectedEventProps,
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
  /** イベントプロパティ */
  #eventProps: PilotSkillTutorial02Props;

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.#eventProps = createPilotSkillTutorial02Props();
  }

  /** @override */
  onStateAnimation(props: CustomStateAnimationProps): Animate {
    return onStateAnimation({ ...props, ...this.#eventProps });
  }

  /** @override */
  async beforeLastState(props: LastStateEventProps): Promise<void> {
    this.#eventProps.eventState = await beforeLastState({
      ...props,
      ...this.#eventProps,
    });
  }

  /** @override */
  async afterLastState(props: LastStateEventProps): Promise<void> {
    this.#eventProps.eventState = await afterLastState({
      ...props,
      ...this.#eventProps,
    });
  }

  /** @override */
  async onBatteryCommandSelected(
    props: BatteryCommandSelectedEventProps,
  ): Promise<CommandCanceled> {
    const { eventState, cancel } = await onBatteryCommandSelected({
      ...props,
      ...this.#eventProps,
    });
    this.#eventProps.eventState = eventState;
    return cancel;
  }

  /** @override */
  async onPilotSkillCommandSelected(
    props: PilotSkillSelectedEventProps,
  ): Promise<CommandCanceled> {
    const { eventState, cancel } = await onPilotSkillCommandSelected({
      ...props,
      ...this.#eventProps,
    });
    this.#eventProps.eventState = eventState;
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
