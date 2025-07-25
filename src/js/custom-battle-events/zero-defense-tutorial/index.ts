import { Animate } from "../../animation/animate";
import {
  BatteryCommandSelectedEventProps,
  BurstSelectedEventProps,
  CommandCanceled,
  CustomBattleEvent,
  CustomStateAnimationProps,
  LastStateEventProps,
  PilotSkillSelectedEventProps,
} from "../../td-scenes/battle/custom-battle-event";
import { EmptyCustomBattleEvent } from "../empty-custom-battle-event";
import { afterLastState } from "./procedures/after-last-state";
import { afterStateAnimation } from "./procedures/after-state-animation";
import { beforeLastState } from "./procedures/before-last-state";
import { onBatteryCommandSelected } from "./procedures/on-battery-command-selected";
import { onBurstCommandSelected } from "./procedures/on-burst-command-selected";
import { onPilotSkillCommandSelected } from "./procedures/on-pilot-skill-command-selected";
import { onStateAnimation } from "./procedures/on-state-animation";
import {
  createZeroDefenseTutorialProps,
  ZeroDefenseTutorialProps,
} from "./props";

/** ゼロ防御チュートリアル */
class ZeroDefenseTutorialEvent extends EmptyCustomBattleEvent {
  /** イベントプロパティ */
  #eventProps: ZeroDefenseTutorialProps;

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.#eventProps = createZeroDefenseTutorialProps();
  }

  /** @override */
  onStateAnimation(props: CustomStateAnimationProps): Animate {
    return onStateAnimation({ ...props, ...this.#eventProps });
  }

  /** @override */
  afterStateAnimation(props: CustomStateAnimationProps): Animate {
    return afterStateAnimation({ ...props, ...this.#eventProps });
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
  async onBurstCommandSelected(
    props: BurstSelectedEventProps,
  ): Promise<CommandCanceled> {
    const { eventState, cancel } = await onBurstCommandSelected({
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
 * ゼロ防御チュートリアル用のカスタムバトルイベントを生成する
 * @returns 生成したカスタムバトルイベント
 */
export function createZeroDefenseTutorialEvent(): CustomBattleEvent {
  return new ZeroDefenseTutorialEvent();
}
