import { Animate } from "../../animation/animate";
import {
  BatteryCommandSelected,
  BurstCommandSelected,
  CommandCanceled,
  CustomBattleEvent,
  CustomStateAnimation,
  LastState,
  PilotSkillCommandSelected,
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
  onStateAnimation(props: CustomStateAnimation): Animate {
    return onStateAnimation({ ...props, ...this.#eventProps });
  }

  /** @override */
  afterStateAnimation(props: CustomStateAnimation): Animate {
    return afterStateAnimation({ ...props, ...this.#eventProps });
  }

  /** @override */
  async beforeLastState(props: LastState): Promise<void> {
    this.#eventProps.eventState = await beforeLastState({
      ...props,
      ...this.#eventProps,
    });
  }

  /** @override */
  async afterLastState(props: LastState): Promise<void> {
    this.#eventProps.eventState = await afterLastState({
      ...props,
      ...this.#eventProps,
    });
  }

  /** @override */
  async onBatteryCommandSelected(
    props: BatteryCommandSelected,
  ): Promise<CommandCanceled> {
    const { state, cancel } = await onBatteryCommandSelected({
      ...props,
      ...this.#eventProps,
    });
    this.#eventProps.eventState = state;
    return cancel;
  }

  /** @override */
  async onBurstCommandSelected(
    props: BurstCommandSelected,
  ): Promise<CommandCanceled> {
    const { state, cancel } = await onBurstCommandSelected({
      ...props,
      ...this.#eventProps,
    });
    this.#eventProps.eventState = state;
    return cancel;
  }

  /** @override */
  async onPilotSkillCommandSelected(
    props: PilotSkillCommandSelected,
  ): Promise<CommandCanceled> {
    const { state, cancel } = await onPilotSkillCommandSelected({
      ...props,
      ...this.#eventProps,
    });
    this.#eventProps.eventState = state;
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
