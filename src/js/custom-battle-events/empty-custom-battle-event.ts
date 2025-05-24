import { Animate } from "../animation/animate";
import { empty } from "../animation/delay";
import type {
  BatteryCommandSelectedEventProps,
  BurstSelectedEventProps,
  CommandCanceled,
  CustomBattleEvent,
  CustomStateAnimationProps,
  LastStateEventProps,
  PilotSkillSelectedEventProps,
  StateUpdateStartedEventProps,
} from "../td-scenes/battle/custom-battle-event";

/**
 * 空のカスタムバトルイベント
 * CustomBattleEventのデフォルト実装を定義する目的で、本クラスを利用すること
 */
export class EmptyCustomBattleEvent implements CustomBattleEvent {
  /** @override */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  onStateUpdateStarted(props: StateUpdateStartedEventProps): void {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    // NOP
  }

  /** @override */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  onStateAnimation(props: CustomStateAnimationProps): Animate {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    return empty();
  }

  /** @override */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  afterStateAnimation(props: CustomStateAnimationProps): Animate {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    return empty();
  }

  /** @override */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  async beforeLastState(props: LastStateEventProps): Promise<void> {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    // NOP
  }

  /** @override */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  async onLastState(props: LastStateEventProps): Promise<void> {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    // NOP
  }

  /** @override */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  async afterLastState(props: LastStateEventProps): Promise<void> {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    // NOP
  }

  /** @override */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  async onBatteryCommandSelected(
    props: BatteryCommandSelectedEventProps,
  ): Promise<CommandCanceled> {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    return {
      isCommandCanceled: false,
    };
  }

  /** @override */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  async onBurstCommandSelected(
    props: BurstSelectedEventProps,
  ): Promise<CommandCanceled> {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    return {
      isCommandCanceled: false,
    };
  }

  /** @override */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  async onPilotSkillCommandSelected(
    props: PilotSkillSelectedEventProps,
  ): Promise<CommandCanceled> {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    return {
      isCommandCanceled: false,
    };
  }
}
