// @flow
import type {
  BatteryCommandSelected,
  CommandCanceled,
  CustomBattleEvent,
  LastState,
} from "../game/td-scenes/battle/custom-battle-event";

/**
 * 空のカスタムバトルイベント
 * CustomBattleEventのデフォルト実装を定義する目的で、本クラスを利用すること
 */
export class EmptyCustomBattleEvent implements CustomBattleEvent {
  /** @override */
  async beforeLastState(props: LastState): Promise<void> { // eslint-disable-line no-unused-vars
    // NOP
  }

  /** @override */
  async onBatteryCommandSelected(props: BatteryCommandSelected): Promise<CommandCanceled> { // eslint-disable-line no-unused-vars
    return {isCommandCanceled: false};
  }
}