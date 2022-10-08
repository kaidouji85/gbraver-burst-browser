// @flow
import type {GameEnd, GameState, GameStateX, PlayerState} from "gbraver-burst-core";
import type {
  BatteryCommandSelected,
  BurstCommandSelected,
  CommandCanceled,
  CustomBattleEvent,
  LastState,
  PilotSkillCommandSelected,
} from "../../game/td-scenes/battle/custom-battle-event";
import {unattentionBurstButton} from "../attention";
import {EmptyCustomBattleEvent} from "../empty-custom-battle-event";
import {
  focusInBatterySelector,
  focusInBurstButton,
  focusInPilotButton,
  focusOutBatterySelector,
  focusOutBurstButton,
  focusOutPilotButton
} from "../focus";
import {extractGameEnd} from "../game-state-extractor";
import {invisibleAllMessageWindows, refreshConversation} from "../invisible-all-message-windows";
import {attackBatteryCaption, burstCaption, defenseBatteryCaption, pilotSkillCaption} from "./captions";
import {beforeLastState} from "./listeners/before-last-state";
import type {BatterySystemTutorialState, SelectableCommands} from "./state";
import {lose} from "./stories/lose";
import {tutorialEnd} from "./stories/tutorial-end";
import {victory} from "./stories/victory";
import {
  cancelZeroBatteryDefense,
  doBurstBecauseZeroBattery,
  doPilotSkillBecauseZeroBattery,
  zeroBatteryDefenseBecauseNoBatteryRecover
} from "./stories/zero-battery";

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
    const enableBatteryCommand: SelectableCommands[] = ['BatteryOnly', 'All'];
    if (!enableBatteryCommand.includes(this.state.selectableCommands)) {
      return {isCommandCanceled: true};
    }

    const foundLastState = this.state.stateHistory[this.state.stateHistory.length - 1];
    const foundPlayer = (foundLastState?.players ?? []).find(v => v.playerId === props.playerId);
    const isZeroBatteryCommand = props.battery.battery === 0;
    if (isZeroBatteryCommand && foundLastState && foundPlayer) {
      const lastState: GameState = foundLastState;
      const player: PlayerState = foundPlayer;
      const isEnemyTurn = lastState.activePlayerId !== props.playerId;
      const isZeroBattery = player.armdozer.battery === 0;
      const enableBurst = player.armdozer.enableBurst;
      const enablePilotSkill = player.pilot.enableSkill;
      if (isEnemyTurn && isZeroBattery && !enableBurst && !enablePilotSkill) {
        await zeroBatteryDefenseBecauseNoBatteryRecover(props);
        refreshConversation(props);
        return {isCommandCanceled: false};
      } else if (isEnemyTurn && isZeroBattery && !enableBurst && enablePilotSkill) {
        await doPilotSkillBecauseZeroBattery(props);
        refreshConversation(props);
        await focusInPilotButton(props, pilotSkillCaption);
        this.state.selectableCommands = 'PilotSkillOnly';
        return {isCommandCanceled: true};
      } else if (isEnemyTurn && isZeroBattery && enableBurst) {
        await doBurstBecauseZeroBattery(props);
        refreshConversation(props);
        unattentionBurstButton(props);
        await focusInBurstButton(props, burstCaption);
        this.state.selectableCommands = 'BurstOnly';
        return {isCommandCanceled: true};
      } else if (isEnemyTurn) {
        await cancelZeroBatteryDefense(props);
        refreshConversation(props);
        (this.state.selectableCommands === 'BatteryOnly') && await focusInBatterySelector(props, defenseBatteryCaption);
        return {isCommandCanceled: true};
      }
    }

    (this.state.selectableCommands === 'BatteryOnly') && focusOutBatterySelector(props);
    return {isCommandCanceled: false};
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