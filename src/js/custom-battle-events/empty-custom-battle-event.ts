import { Animate } from "../animation/animate";
import { empty } from "../animation/delay";
import type {
  BatteryCommandSelected,
  BurstCommandSelected,
  CommandCanceled,
  CustomBattleEvent,
  CustomStateAnimation,
  LastState,
  PilotSkillCommandSelected,
  StateUpdateStarted,
} from "../td-scenes/battle/custom-battle-event";

/**
 * 空のカスタムバトルイベント
 * CustomBattleEventのデフォルト実装を定義する目的で、本クラスを利用すること
 */
export class EmptyCustomBattleEvent implements CustomBattleEvent {
  /** @override */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  onStateUpdateStarted(props: StateUpdateStarted): void {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    // NOP
  }

  /** @override */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  onStateAnimation(props: CustomStateAnimation): Animate {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    return empty();
  }

  /** @override */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  afterStateAnimation(props: CustomStateAnimation): Animate {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    return empty();
  }

  /** @override */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  async beforeLastState(props: LastState): Promise<void> {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    // NOP
  }

  /** @override */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  async onLastState(props: LastState): Promise<void> {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    // NOP
  }

  /** @override */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  async afterLastState(props: LastState): Promise<void> {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    // NOP
  }

  /** @override */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  async onBatteryCommandSelected(
    props: BatteryCommandSelected,
  ): Promise<CommandCanceled> {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    return {
      isCommandCanceled: false,
    };
  }

  /** @override */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  async onBurstCommandSelected(
    props: BurstCommandSelected,
  ): Promise<CommandCanceled> {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    return {
      isCommandCanceled: false,
    };
  }

  /** @override */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  async onPilotSkillCommandSelected(
    props: PilotSkillCommandSelected,
  ): Promise<CommandCanceled> {
    /* eslint-enable @typescript-eslint/no-unused-vars */
    return {
      isCommandCanceled: false,
    };
  }
}
