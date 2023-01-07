import type { BatteryCommandSelected, BurstCommandSelected, CommandCanceled, CustomBattleEvent, LastState, PilotSkillCommandSelected } from "../td-scenes/battle/custom-battle-event";

/**
 * 空のカスタムバトルイベント
 * CustomBattleEventのデフォルト実装を定義する目的で、本クラスを利用すること
 */
export class EmptyCustomBattleEvent implements CustomBattleEvent {
  /** @override */

  /* eslint-disable no-unused-vars */
  async beforeLastState(props: LastState): Promise<void> {
    /* eslint-enable no-unused-vars */
    // NOP
  }

  /** @override */

  /* eslint-disable no-unused-vars */
  async onLastState(props: LastState): Promise<void> {
    /* eslint-enable no-unused-vars */
    // NOP
  }

  /** @override */

  /* eslint-disable no-unused-vars */
  async afterLastState(props: LastState): Promise<void> {
    /* eslint-enable no-unused-vars */
    // NOP
  }

  /** @override */

  /* eslint-disable no-unused-vars */
  async onBatteryCommandSelected(props: BatteryCommandSelected): Promise<CommandCanceled> {
    /* eslint-enable no-unused-vars */
    return {
      isCommandCanceled: false
    };
  }

  /** @override */

  /* eslint-disable no-unused-vars */
  async onBurstCommandSelected(props: BurstCommandSelected): Promise<CommandCanceled> {
    /* eslint-enable no-unused-vars */
    return {
      isCommandCanceled: false
    };
  }

  /** @override */

  /* eslint-disable no-unused-vars */
  async onPilotSkillCommandSelected(props: PilotSkillCommandSelected): Promise<CommandCanceled> {
    /* eslint-enable no-unused-vars */
    return {
      isCommandCanceled: false
    };
  }

}