// @flow
import type {
  BatteryCommandSelected,
  BurstCommandSelected,
  CommandCanceled,
  CustomBattleEvent,
  LastState,
  PilotSkillCommandSelected
} from "../../game/td-scenes/battle/custom-battle-event";
import {EmptyCustomBattleEvent} from "../empty-custom-battle-event";
import {focusOutPilotButton} from "../focus";
import {afterLastState} from "./listeners/after-last-state";
import {beforeLastState} from "./listeners/before-last-state";
import {onBatteryCommandSelected} from "./listeners/on-battery-command-selected";
import type {SelectableCommands, ZeroDefenseTutorialState} from "./state";
import {onBurstCommandSelected} from "./stories/on-burst-command-selected";

/** ゼロ防御チュートリアル */
class ZeroDefenseTutorialEvent extends EmptyCustomBattleEvent {
  /** ステート */
  state: ZeroDefenseTutorialState;

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.state = {
      stateHistory: [],
      selectableCommands: 'All',
      isIntroductionComplete: false,
      isDamageRaceComplete: false,
    };
  }

  /** @override */
  async beforeLastState(props: LastState): Promise<void> {
    this.state = await beforeLastState(props, this.state);
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
      return {isCommandCanceled: false};
    }

    return {isCommandCanceled: false};
  }
}

/**
 * ゼロ防御チュートリアル用のカスタムバトルイベントを生成する
 * 
 * @return 生成したカスタムバトルイベント
 */
export function createZeroDefenseTutorialEvent(): CustomBattleEvent {
  return new ZeroDefenseTutorialEvent();
}