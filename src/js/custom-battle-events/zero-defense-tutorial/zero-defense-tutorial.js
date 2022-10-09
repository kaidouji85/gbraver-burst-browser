// @flow
import type {
  BatteryCommandSelected,
  BurstCommandSelected,
  CommandCanceled,
  CustomBattleEvent,
  CustomBattleEventProps,
  LastState,
  PilotSkillCommandSelected
} from "../../game/td-scenes/battle/custom-battle-event";
import {activeRightMessageWindowWithFace} from "../active-message-window";
import {unattentionBurstButton, unattentionPilotButton} from "../attention";
import {EmptyCustomBattleEvent} from "../empty-custom-battle-event";
import {focusInBurstButton, focusInPilotButton, focusOutBurstButton, focusOutPilotButton} from "../focus";
import {invisibleAllMessageWindows, refreshConversation} from "../invisible-all-message-windows";
import {scrollRightMessages} from "../scroll-messages";
import {shouldBurst, shouldPilotSkill} from "./captions";
import {beforeLastState} from "./listeners/before-last-state";
import {playerLose} from "./stories/player-lose";
import type {SelectableCommands, ZeroDefenseTutorialState} from "./state";
import {gameEndThanks} from "./stories/game-end-thanks";
import {zeroDefenseWin} from "./stories/zero-defense-win";

/**
 * ストーリー 0防御禁止
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const noZeroBattery = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Tsubasa');
  await scrollRightMessages(props, [
    ['ツバサ', '「待てシンヤ 0防御はまずい'],
    ['HPが満タンでも 即死するダメージを受けるんだ」'],
  ]);
};

/**
 * ストーリー 0防御なのでコマンドキャンセル
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const cancelZeroBatteryDefense = async (props: CustomBattleEventProps) => {
  await noZeroBattery(props);
  await refreshConversation(props, 100);

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「りょ 了解ッス'],
    ['このまま瞬殺されるところだったッス」']
  ]);
  invisibleAllMessageWindows(props);
};

/**
 * ストーリー 0防御0バッテリーなのでバーストする
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const doBurstBecauseZeroBattery = async (props: CustomBattleEventProps) => {
  await noZeroBattery(props);
  await refreshConversation(props, 100);

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「でもツバサ先輩 俺のバッテリーはもう0ッスよ」'],
  ]);
  await refreshConversation(props, 100);

  activeRightMessageWindowWithFace(props, 'Tsubasa');
  await scrollRightMessages(props, [
    ['ツバサ', '「こういう時はバーストで一気にバッテリーを回復させるんだ」'],
  ]);
  await refreshConversation(props, 100);

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「了解ッス'],
    ['バーストすればいいんスね」']
  ]);
  invisibleAllMessageWindows(props);
};

/**
 * ストーリー 0防御0バッテリーなのでパイロットスキルを使う
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const doPilotSkillBecauseZeroBattery = async (props: CustomBattleEventProps) => {
  await noZeroBattery(props);
  await refreshConversation(props, 100);

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「でもツバサ先輩 俺のバッテリーはもう0ッスよ」'],
  ]);
  await refreshConversation(props, 100);

  activeRightMessageWindowWithFace(props, 'Tsubasa');
  await scrollRightMessages(props, [
    ['ツバサ', '「こういう時はバーストで一気にバッテリーを回復させるんだ'],
    ['……と言いたい所だが、バーストは使用済みか'],
    ['ならば君に秘められた力 パイロットスキルを発動するんだ」']
  ]);
  await refreshConversation(props, 100);

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「俺に秘められた力?」'],
  ]);
  await refreshConversation(props, 100);

  activeRightMessageWindowWithFace(props, 'Tsubasa');
  await scrollRightMessages(props, [
    ['ツバサ', '「君のパイロットスキルではバッテリーを少しだけ回復できる'],
    ['それで急場を凌ぐんだ」'],
  ]);
  await refreshConversation(props, 100);

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「了解ッス'],
    ['俺の根性 見せてやる」']
  ]);
  invisibleAllMessageWindows(props);
};

/**
 * ストーリー バースト、パイロットスキルが使えず0バッテリーなので負け確定
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const zeroBatteryDefenseBecauseNoBatteryRecover = async (props: CustomBattleEventProps) => {
  await noZeroBattery(props);
  await refreshConversation(props, 100);

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「でもツバサ先輩 俺のバッテリーはもう0ッスよ」'],
  ]);
  await refreshConversation(props, 100);

  activeRightMessageWindowWithFace(props, 'Tsubasa');
  await scrollRightMessages(props, [
    ['ツバサ', '「こういう時はバーストで一気にバッテリーを回復させるんだ'],
    ['……と言いたい所だが、バーストは使用済みか'],
    ['ならば君に秘められた力 パイロットスキル'],
    ['……も発動済みか']
  ]);
  await refreshConversation(props, 100);

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「ツバサ先輩 何とかならないッスか」'],
  ]);
  await refreshConversation(props, 100);

  activeRightMessageWindowWithFace(props, 'Tsubasa');
  await scrollRightMessages(props, [
    ['ツバサ', '「すまない これ以上は打つ手がない」'],
  ]);
  await refreshConversation(props, 100);

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「そんな」'],
  ]);
  await refreshConversation(props, 100);

  activeRightMessageWindowWithFace(props, 'Tsubasa');
  await scrollRightMessages(props, [
    ['ツバサ', '「初心者にはよくあることだ'],
    ['あまり気にするな シンヤ」']
  ]);
  invisibleAllMessageWindows(props);
};

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
    const foundBatteryDeclaration = props.update.find(v => v.effect.name === 'BatteryDeclaration');
    const batteryDeclaration = foundBatteryDeclaration && foundBatteryDeclaration.effect.name === 'BatteryDeclaration'
      ? {defenderBattery: foundBatteryDeclaration.effect.defenderBattery,
        isPlayerAttack: foundBatteryDeclaration.effect.attacker === props.playerId}
      : null;
    const foundGameEnd = props.update.find(v => v.effect.name === 'GameEnd');
    const gameOver = foundGameEnd && foundGameEnd.effect.name === 'GameEnd' && foundGameEnd.effect.result.type === 'GameOver'
      ? {isPlayerWin: foundGameEnd.effect.result.winner === props.playerId}
      : null;
    if (batteryDeclaration && batteryDeclaration.defenderBattery === 0 && batteryDeclaration.isPlayerAttack
      && gameOver && gameOver.isPlayerWin)
    {
      await zeroDefenseWin(props);
      await refreshConversation(props);
      await gameEndThanks(props);
    } else if (gameOver && !gameOver.isPlayerWin) {
      await playerLose(props);
      await refreshConversation(props);
      await gameEndThanks(props);
    }
  }

  /** @override */
  async onBatteryCommandSelected(props: BatteryCommandSelected): Promise<CommandCanceled> {
    const enableBatteryCommand: SelectableCommands[] = ['All'];
    if (!enableBatteryCommand.includes(this.state.selectableCommands)) {
      return {isCommandCanceled: true};
    }

    const foundLastState = this.state.stateHistory[this.state.stateHistory.length - 1];
    const lastState = foundLastState
      ? {isEnemyTurn: foundLastState.activePlayerId !== props.playerId,
        player: foundLastState.players.find(v => v.playerId === props.playerId)}
      : null;
    const lastPlayer = (lastState && lastState.player)
      ? {isZeroBattery: lastState.player.armdozer.battery === 0,
        enableBurst: lastState.player.armdozer.enableBurst, enablePilotSkill: lastState.player.pilot.enableSkill}
      : null
    const isZeroBatteryCommand = props.battery.battery === 0;
    if (isZeroBatteryCommand && lastState && lastState.isEnemyTurn && lastPlayer && !lastPlayer.isZeroBattery) {
      await cancelZeroBatteryDefense(props);
      return {isCommandCanceled: true};
    } else if (isZeroBatteryCommand && lastState && lastState.isEnemyTurn && lastPlayer && lastPlayer.isZeroBattery && lastPlayer.enableBurst) {
      this.state.selectableCommands = 'BurstOnly';
      await doBurstBecauseZeroBattery(props);
      unattentionBurstButton(props);
      await focusInBurstButton(props, shouldBurst);
      return {isCommandCanceled: true};
    } else if (isZeroBatteryCommand && lastState && lastState.isEnemyTurn && lastPlayer && lastPlayer.isZeroBattery 
      && !lastPlayer.enableBurst && lastPlayer.enablePilotSkill)
    {
      this.state.selectableCommands = 'PilotSkillOnly';
      await doPilotSkillBecauseZeroBattery(props);
      unattentionPilotButton(props);
      await focusInPilotButton(props, shouldPilotSkill);
      return {isCommandCanceled: true};
    } else if (isZeroBatteryCommand && lastState && lastState.isEnemyTurn && lastPlayer && lastPlayer.isZeroBattery 
      && !lastPlayer.enableBurst && !lastPlayer.enablePilotSkill)
    {
      await zeroBatteryDefenseBecauseNoBatteryRecover(props);
      refreshConversation(props);
      return {isCommandCanceled: false};
    }
    return {isCommandCanceled: false};
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