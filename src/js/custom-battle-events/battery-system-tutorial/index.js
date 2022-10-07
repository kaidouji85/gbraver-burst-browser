// @flow
import type {GameState} from "gbraver-burst-core";
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
import {extractBattle, extractGameEnd} from "../game-state-extractor";
import {invisibleAllMessageWindows, refreshConversation} from "../invisible-all-message-windows";
import {turnCount} from "../turn-count";
import {
  batteryRuleDescription,
  cancelZeroBatteryDefense,
  completeAttackAndDefense,
  doBurstBecauseZeroBattery,
  doPilotSkillBecauseZeroBattery,
  enemyAttack,
  introduction,
  lose,
  playerAttack,
  tutorialEnd,
  victory,
  zeroBatteryDefenseBecauseNoBatteryRecover
} from "./stories";

/** 攻撃バッテリー注釈 */
const attackBatteryCaption = [
  '好きなバッテリーで攻撃してみよう',
  'ツバサ先輩よりも大きい数字を出せば攻撃が当たるぞ'
];

/** 防御バッテリー注釈 */
const defenseBatteryCaption = [
  '好きなバッテリーで防御してみよう',
  'ツバサ先輩よりも大きい数字を出せば攻撃を回避できるぞ'
];

/** バースト注釈 */
const burstCaption = [
  'このまま0防御すると負け確定だ',
  'バーストでバッテリーを回復させよう'
];

/** パイロットスキル注釈 */
const pilotSkillCaption = [
  'このまま0防御すると負け確定だ',
  'シンヤのパイロットスキルを発動して バッテリーを回復させよう'
];

/** 選択可能なコマンド */
type SelectableCommands = 'BatteryOnly' | 'BurstOnly' | 'PilotSkillOnly' | 'All';

/** バッテリーシステムチュートリアル用のカスタムバトルイベント */
class BatterySystemTutorialEvent extends EmptyCustomBattleEvent {
  /** ステートヒストリー、 beforeLastState開始時に更新される */
  stateHistory: GameState[];
  /** 選択可能なコマンド */
  selectableCommands: SelectableCommands;
  /** バッテリーシステムの解説が完了しているか、trueで完了している */
  isBatterySystemDescriptionComplete: boolean;

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.stateHistory = [];
    this.selectableCommands = 'BatteryOnly';
    this.isBatterySystemDescriptionComplete = false;
  }

  /** @override */
  async beforeLastState(props: LastState): Promise<void> {
    this.stateHistory = [...this.stateHistory, ...props.update];
    const extractedGameEnd = extractGameEnd(props.update);
    if (extractedGameEnd) {
      return;
    }

    const turn = turnCount(this.stateHistory);
    const extractedBattle = extractBattle(props.update);
    const lastBattle = extractedBattle && extractedBattle.effect.name === 'Battle'
      ? {isAttacker: extractedBattle.effect.attacker === props.playerId, result: extractedBattle.effect.result}
      : null;
    if (turn === 1) {
      await introduction(props);
    } else if (turn === 2 && lastBattle) {
      await playerAttack(props, lastBattle.result);
      await refreshConversation(props);
      await batteryRuleDescription(props);
    } else if (turn === 3 && lastBattle) {
      this.selectableCommands = 'All';
      this.isBatterySystemDescriptionComplete = true;
      await enemyAttack(props, lastBattle.result);
      await refreshConversation(props);
      await completeAttackAndDefense(props);
      invisibleAllMessageWindows(props);
    } else if (lastBattle && lastBattle.isAttacker) {
      await playerAttack(props, lastBattle.result);
      refreshConversation(props);
    } else if (lastBattle && !lastBattle.isAttacker) {
      await enemyAttack(props, lastBattle.result);
      refreshConversation(props);
    }
  }

  /** @override */
  async onLastState(props: LastState): Promise<void> {
    const foundLastState = props.update[props.update.length - 1];
    const lastState = foundLastState
      ? {isInputCommand: foundLastState.effect.name === 'InputCommand', isMyTurn: foundLastState.activePlayerId === props.playerId}
      : null;
    if (!this.isBatterySystemDescriptionComplete && lastState && lastState.isInputCommand && lastState.isMyTurn) {
      await focusInBatterySelector(props, attackBatteryCaption);
    } else if (!this.isBatterySystemDescriptionComplete && lastState && lastState.isInputCommand && !lastState.isMyTurn) {
      await focusInBatterySelector(props, defenseBatteryCaption);
    }
  }

  /** @override */
  async afterLastState(props: LastState): Promise<void> {
    const foundGameEnd = props.update.find(v => v.effect.name === 'GameEnd');
    const gameEnd = (foundGameEnd && foundGameEnd.effect.name === 'GameEnd')
      ? {isVictory: foundGameEnd.effect.result.type === 'GameOver' && foundGameEnd.effect.result.winner === props.playerId}
      : null;
    if (gameEnd && gameEnd.isVictory) {
      await victory(props);
      await refreshConversation(props);
      await tutorialEnd(props);
      invisibleAllMessageWindows(props);
    } else if (gameEnd && !gameEnd.isVictory) {
      await lose(props);
      await refreshConversation(props);
      await tutorialEnd(props);
      invisibleAllMessageWindows(props);
    }
  }

  /** @override */
  async onBatteryCommandSelected(props: BatteryCommandSelected): Promise<CommandCanceled> {
    const enableBatteryCommand: SelectableCommands[] = ['BatteryOnly', 'All'];
    if (!enableBatteryCommand.includes(this.selectableCommands)) {
      return {isCommandCanceled: true};
    }

    const foundLastState = this.stateHistory[this.stateHistory.length - 1];
    const lastState = foundLastState
      ? {isEnemyTurn: foundLastState.activePlayerId !== props.playerId,
        player: foundLastState.players.find(v => v.playerId === props.playerId)}
      : null;
    const lastPlayer = (lastState && lastState.player)
      ? {isZeroBattery: lastState.player.armdozer.battery === 0,
        enableBurst: lastState.player.armdozer.enableBurst, enablePilotSkill: lastState.player.pilot.enableSkill}
      : null
    const isZeroBatteryCommand = props.battery.battery === 0;
    if (isZeroBatteryCommand && lastState  && lastState.isEnemyTurn && lastPlayer && lastPlayer.isZeroBattery && !lastPlayer.enableBurst && !lastPlayer.enablePilotSkill) {
      await zeroBatteryDefenseBecauseNoBatteryRecover(props);
      refreshConversation(props);
      return {isCommandCanceled: false};
    } else if (isZeroBatteryCommand && lastState && lastState.isEnemyTurn && lastPlayer && lastPlayer.isZeroBattery && !lastPlayer.enableBurst && lastPlayer.enablePilotSkill) {
      await doPilotSkillBecauseZeroBattery(props);
      refreshConversation(props);
      this.selectableCommands = 'PilotSkillOnly';
      await focusInPilotButton(props, pilotSkillCaption);
      return {isCommandCanceled: true};
    } else if (isZeroBatteryCommand && lastState && lastState.isEnemyTurn && lastPlayer && lastPlayer.isZeroBattery && lastPlayer.enableBurst) {
      await doBurstBecauseZeroBattery(props);
      refreshConversation(props);
      this.selectableCommands = 'BurstOnly';
      unattentionBurstButton(props);
      await focusInBurstButton(props, burstCaption);
      return {isCommandCanceled: true};
    } else if (isZeroBatteryCommand && lastState && lastState.isEnemyTurn) {
      await cancelZeroBatteryDefense(props);
      refreshConversation(props);
      (this.selectableCommands === 'BatteryOnly') && await focusInBatterySelector(props, defenseBatteryCaption);
      return {isCommandCanceled: true};
    }

    (this.selectableCommands === 'BatteryOnly') && focusOutBatterySelector(props);
    return {isCommandCanceled: false};
  }

  /** @override */
  async onBurstCommandSelected(props: BurstCommandSelected): Promise<CommandCanceled> {
    const enableBurstCommand: SelectableCommands[] = ['BurstOnly', 'All'];
    if (!enableBurstCommand.includes(this.selectableCommands)) {
      return {isCommandCanceled: true};
    }

    if (this.selectableCommands === 'BurstOnly') {
      this.selectableCommands = this.isBatterySystemDescriptionComplete  ? 'All' : 'BatteryOnly';
      focusOutBurstButton(props);
      return {isCommandCanceled: false};
    }

    return {isCommandCanceled: false};
  }

  /** @override */
  async onPilotSkillCommandSelected(props: PilotSkillCommandSelected): Promise<CommandCanceled> {
    const enablePilotSkillCommand: SelectableCommands[] = ['All', 'PilotSkillOnly'];
    if (!enablePilotSkillCommand.includes(this.selectableCommands)) {
      return {isCommandCanceled: true};
    }

    if (this.selectableCommands === 'PilotSkillOnly') {
      this.selectableCommands = 'All';
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