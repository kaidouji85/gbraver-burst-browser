// @flow
import type {
  BatteryCommandSelected,
  BurstCommandSelected,
  CommandCanceled,
  CustomBattleEvent,
  LastState,
  PilotSkillCommandSelected,
} from "../../game/td-scenes/battle/custom-battle-event";
import {EmptyCustomBattleEvent} from "../empty-custom-battle-event";
import {focusOutPilotButton} from "../focus";
import {afterLastState} from "./listeners/after-last-state";
import {beforeLastState} from "./listeners/before-last-state";
import {onBatteryCommandSelected} from "./listeners/on-battery-command-selected";
import {onBurstCommandSelected} from "./listeners/on-burst-command-selected";
import {onLastState} from "./listeners/on-last-state";
import type {BatterySystemTutorialState, SelectableCommands} from "./state";

/** バッテリーシステムチュートリアル用のカスタムバトルイベント */
class BatterySystemTutorialEvent extends EmptyCustomBattleEvent {
  /** チュートリアルのステート */
  state: BatterySystemTutorialState;

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.state = {stateHistory: [], selectableCommands: 'BatteryOnly', isBatterySystemDescriptionComplete: false,};
  }

  /** @override */
  async beforeLastState(props: LastState): Promise<void> {
    this.state = await beforeLastState(props, this.state);
  }

  /** @override */
  async onLastState(props: LastState): Promise<void> {
    this.state = await onLastState(props, this.state);
  }

  /** @override */
  async afterLastState(props: LastState): Promise<void> {
    this.state = await afterLastState(props, this.state);
  }

  /** @override */
  async onBatteryCommandSelected(props: BatteryCommandSelected): Promise<CommandCanceled> {
    const {state, cancel} = await onBatteryCommandSelected(props, this.state);
    this.state = state;
    return cancel;
  }

  /** @override */
  async onBurstCommandSelected(props: BurstCommandSelected): Promise<CommandCanceled> {
    const {state, cancel} = await onBurstCommandSelected(props, this.state);
    this.state = state;
    return cancel;
  }

  /** @override */
  async onPilotSkillCommandSelected(props: PilotSkillCommandSelected): Promise<CommandCanceled> {
    const enablePilotSkillCommand: SelectableCommands[] = ['All', 'PilotSkillOnly'];
    if (!enablePilotSkillCommand.includes(this.state.selectableCommands)) {
      return {isCommandCanceled: true};
    }

    if (this.state.selectableCommands === 'PilotSkillOnly') {
      this.state.selectableCommands = 'All';
      focusOutPilotButton(props);
    }

    return {isCommandCanceled: false};
  }
}

/**
 * バッテリーシステムチュートリアル用のカスタバトルイベントを生成する
 *
 * @return 生成したカスタムバトルイベント
 */
export function createBatterySystemTutorialEvent(): CustomBattleEvent {
  return new BatterySystemTutorialEvent();
}