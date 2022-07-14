// @flow
import type {
  BatteryDecideProps,
  CommandCancel,
  CustomBattleEvent,
  LastStateProps
} from "../game/td-scenes/battle/custom-battle-event";

/**
 * 空のカスタムバトルイベント
 * CustomBattleEventのデフォルト実装を定義する目的で、本クラスを利用すること
 */
export class EmptyCustomBattleEvent implements CustomBattleEvent {
  /** @override */
  async willLastState(props: LastStateProps): Promise<void> { // eslint-disable-line no-unused-vars
    // NOP
  }

  /** @override */
  async didBatteryDecide(props: BatteryDecideProps): Promise<CommandCancel> { // eslint-disable-line no-unused-vars
    return {isCommandCanceled: false};
  }
}