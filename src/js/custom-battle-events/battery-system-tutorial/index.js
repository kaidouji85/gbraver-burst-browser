// @flow
import type {GameEnd, GameState, GameStateX} from "gbraver-burst-core";
import type {
  BatteryCommandSelected,
  BurstCommandSelected,
  CommandCanceled,
  CustomBattleEvent,
  LastState,
  PilotSkillCommandSelected,
} from "../../game/td-scenes/battle/custom-battle-event";
import {EmptyCustomBattleEvent} from "../empty-custom-battle-event";
import {focusInBatterySelector, focusOutBurstButton, focusOutPilotButton} from "../focus";
import {extractGameEnd} from "../game-state-extractor";
import {invisibleAllMessageWindows, refreshConversation} from "../invisible-all-message-windows";
import {attackBatteryCaption, defenseBatteryCaption} from "./captions";
import {beforeLastState} from "./listeners/before-last-state";
import {onBatteryCommandSelected} from "./listeners/on-battery-command-selected";
import type {BatterySystemTutorialState, SelectableCommands} from "./state";
import {lose} from "./stories/lose";
import {tutorialEnd} from "./stories/tutorial-end";
import {victory} from "./stories/victory";

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
    const foundLastState = props.update[props.update.length - 1];
    if (!foundLastState) {
      return;
    }

    const lastState: GameState = foundLastState;
    if (lastState.effect.name !== 'InputCommand') {
      return;
    }

    const isMyTurn = lastState.activePlayerId === props.playerId;
    if (!this.state.isBatterySystemDescriptionComplete  && isMyTurn) {
      await focusInBatterySelector(props, attackBatteryCaption);
    } else if (!this.state.isBatterySystemDescriptionComplete && !isMyTurn) {
      await focusInBatterySelector(props, defenseBatteryCaption);
    }
  }

  /** @override */
  async afterLastState(props: LastState): Promise<void> {
    const extractedGameEnd = extractGameEnd(props.update);
    if (!extractedGameEnd) {
      return;
    }

    const gameEnd: GameStateX<GameEnd> = extractedGameEnd;
    const result = gameEnd.effect.result;
    const isVictory = result.type === 'GameOver' && result.winner === props.playerId;
    isVictory ? await victory(props) : await lose(props);
    await refreshConversation(props);
    await tutorialEnd(props);
    invisibleAllMessageWindows(props);
  }

  /** @override */
  async onBatteryCommandSelected(props: BatteryCommandSelected): Promise<CommandCanceled> {
    const {state, cancel} = await onBatteryCommandSelected(props, this.state);
    this.state = state;
    return cancel;
  }

  /** @override */
  async onBurstCommandSelected(props: BurstCommandSelected): Promise<CommandCanceled> {
    const enableBurstCommand: SelectableCommands[] = ['BurstOnly', 'All'];
    if (!enableBurstCommand.includes(this.state.selectableCommands)) {
      return {isCommandCanceled: true};
    }

    if (this.state.selectableCommands === 'BurstOnly') {
      this.state.selectableCommands = this.state.isBatterySystemDescriptionComplete  ? 'All' : 'BatteryOnly';
      focusOutBurstButton(props);
      return {isCommandCanceled: false};
    }

    return {isCommandCanceled: false};
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