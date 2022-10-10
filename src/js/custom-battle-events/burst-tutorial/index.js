// @flow
import type {
  BatteryCommandSelected,
  BurstCommandSelected,
  CommandCanceled,
  CustomBattleEvent,
  CustomBattleEventProps,
  LastState,
  PilotSkillCommandSelected,
} from "../../game/td-scenes/battle/custom-battle-event";
import {EmptyCustomBattleEvent} from "../empty-custom-battle-event";
import {focusInBurstButton, focusInPilotButton, focusOutBurstButton, focusOutPilotButton} from "../focus";
import {shouldBurst, shouldPilotSkill} from "./captions";
import {beforeLastState} from "./listeners/before-last-state";
import type {BurstTutorialState, SelectableCommands} from "./state";
import {canNotChangeBattery} from "./stories/can-not-change-battery";
import {doBurstToRecoverBattery} from "./stories/do-burst-to-recover-battery";
import {doPilotSkillToRecoverBattery} from "./stories/do-pilot-skill-to-recover-battery";
import {notDefense5Carelessly} from "./stories/not-defense5-carelessly";
import {playerLose} from "./stories/player-lose";
import {playerWin} from "./stories/player-win";
import {redoBatterySelect} from "./stories/redo-battery-select";
import {shouldDefense5} from "./stories/should-defense5";
import {shouldDefense5Again} from "./stories/should-defense5-again";

/** バーストチュートリアル用のカスタムバトルイベント */
class BurstTutorial extends EmptyCustomBattleEvent {
  /** ステート */
  state: BurstTutorialState;

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.state = {
      stateHistory: [],
      isIntroductionComplete: false,
      isLoseIfNoDefense5Complete: false,
      selectableCommands: 'All',
    };
  }

  /** @override */
  async beforeLastState(props: LastState): Promise<void> {
    this.state = await beforeLastState(props, this.state);
  }

  /** @override */
  async onBatteryCommandSelected(props: BatteryCommandSelected): Promise<CommandCanceled> {
    const enableBurstCommand: SelectableCommands[] = ['All'];
    if (!enableBurstCommand.includes(this.state.selectableCommands)) {
      return {isCommandCanceled: true};
    }

    const foundLastState = this.state.stateHistory[this.state.stateHistory.length - 1];
    const latestPlayer = (foundLastState?.players ?? []).find(v => v.playerId === props.playerId);
    const latestEnemy = (foundLastState?.players ?? []).find(v => v.playerId !== props.playerId);
    const lastState = foundLastState && latestPlayer && latestEnemy
      ? {isEnemyTurn: foundLastState.activePlayerId !== props.playerId,
        isPlayerFullBattery: latestPlayer.armdozer.battery === 5,
        isEnemyFullBattery: latestEnemy.armdozer.battery === 5,
        isHpLessThanEnemyPower: latestPlayer.armdozer.hp <= latestEnemy.armdozer.power,
        enableBurst: latestPlayer.armdozer.enableBurst,
        enablePilotSkill: latestPlayer.pilot.enableSkill}
      : null;
    const notBattery5 = props.battery.battery !== 5;
    const defense5 = async (props: CustomBattleEventProps) => {
      this.state.isLoseIfNoDefense5Complete ? await shouldDefense5Again(props) : await shouldDefense5(props);
    };
    if (notBattery5 && lastState && lastState.isEnemyTurn && lastState.isHpLessThanEnemyPower && lastState.isEnemyFullBattery
      && !lastState.isPlayerFullBattery && lastState.enableBurst)
    {
      await defense5(props);
      this.state.isLoseIfNoDefense5Complete = true;
      await doBurstToRecoverBattery(props);
      await focusInBurstButton(props, shouldBurst);
      this.state.selectableCommands = 'BurstOnly';
      return {isCommandCanceled: true};
    } else if (notBattery5 && lastState && lastState.isEnemyTurn && lastState.isHpLessThanEnemyPower && lastState.isEnemyFullBattery
      && !lastState.isPlayerFullBattery && !lastState.enableBurst && lastState.enablePilotSkill)
    {
      await defense5(props);
      this.state.isLoseIfNoDefense5Complete = true;
      await doPilotSkillToRecoverBattery(props);
      await focusInPilotButton(props, shouldPilotSkill);
      this.state.selectableCommands = 'PilotSkillOnly';
      return {isCommandCanceled: true};
    } else if (notBattery5 && lastState && lastState.isEnemyTurn && lastState.isHpLessThanEnemyPower && lastState.isEnemyFullBattery
      && !lastState.isPlayerFullBattery && !lastState.enableBurst && !lastState.enablePilotSkill)
    {
      await defense5(props);
      this.state.isLoseIfNoDefense5Complete = true;
      await canNotChangeBattery(props);
      return {isCommandCanceled: false};
    } else if (notBattery5 && lastState && lastState.isEnemyTurn && lastState.isHpLessThanEnemyPower && lastState.isEnemyFullBattery
      && lastState.isPlayerFullBattery)
    {
      await defense5(props);
      this.state.isLoseIfNoDefense5Complete ? await notDefense5Carelessly(props) : await redoBatterySelect(props);
      this.state.isLoseIfNoDefense5Complete = true;
      return {isCommandCanceled: true};
    }

    return {isCommandCanceled: false};
  }

  /** @override */
  async afterLastState(props: LastState): Promise<void> {
    const foundGameEnd = props.update.find(v => v.effect.name === 'GameEnd');
    const gameOver = foundGameEnd && foundGameEnd.effect.name === 'GameEnd' && foundGameEnd.effect.result.type === 'GameOver'
      ? {isPlayerWin: foundGameEnd.effect.result.winner === props.playerId}
      : null;
    if (gameOver && gameOver.isPlayerWin) {
      await playerWin(props);
    } else if (gameOver && !gameOver.isPlayerWin) {
      await playerLose(props);
    }
  }

  /** @override */
  async onBurstCommandSelected(props: BurstCommandSelected): Promise<CommandCanceled> {
    const enableBurstCommand: SelectableCommands[] = ['BurstOnly', 'All'];
    if (!enableBurstCommand.includes(this.state.selectableCommands)) {
      return {isCommandCanceled: true};
    }

    if (this.state.selectableCommands === 'BurstOnly') {
      this.state.selectableCommands = 'All';
      focusOutBurstButton(props);
      return {isCommandCanceled: false};
    }

    return {isCommandCanceled: false};
  }

  /** @override */
  async onPilotSkillCommandSelected(props: PilotSkillCommandSelected): Promise<CommandCanceled> {
    const enablePilotSkillCommand: SelectableCommands[] = ['PilotSkillOnly', 'All'];
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
 * バーストチュートリアル用のカスタムバトルイベントを生成する
 * 
 * @return 生成したカスタムバトルイベント
 */
export function createBurstTutorialEvent(): CustomBattleEvent {
  return new BurstTutorial();
}