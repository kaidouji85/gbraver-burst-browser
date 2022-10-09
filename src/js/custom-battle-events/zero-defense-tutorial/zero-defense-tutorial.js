// @flow
import type {GameState} from "gbraver-burst-core";
import type {
  BatteryCommandSelected,
  BurstCommandSelected,
  CommandCanceled,
  CustomBattleEvent,
  CustomBattleEventProps,
  LastState,
  PilotSkillCommandSelected
} from "../../game/td-scenes/battle/custom-battle-event";
import {activeLeftMessageWindowWithFace, activeRightMessageWindowWithFace} from "../active-message-window";
import {unattentionBurstButton, unattentionPilotButton} from "../attention";
import {EmptyCustomBattleEvent} from "../empty-custom-battle-event";
import {focusInBurstButton, focusInPilotButton, focusOutBurstButton, focusOutPilotButton} from "../focus";
import {invisibleAllMessageWindows, refreshConversation} from "../invisible-all-message-windows";
import {scrollLeftMessages, scrollRightMessages} from "../scroll-messages";

/**
 * ストーリー 冒頭
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const introduction = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「俺 都立大田高校のシンヤ ッス'],
    ['同じ一年生同士 よろしく頼むッス」']
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, 'Gai');
  await scrollLeftMessages(props, [
    ['ガイ', '「都立台東高校のガイだ'],
    ['強豪校だと期待していたが'],
    ['こんな締まりのない奴が出てくるとはな」']
  ]);
  await refreshConversation(props);

  activeRightMessageWindowWithFace(props, 'Tsubasa');
  await scrollRightMessages(props, [
    ['ツバサ', '「間もなく 台東高校 大田高校の合同練習試合を開始する'],
    ['一同 姿勢を正して 礼!!」']
  ]);
  props.view.dom.leftMessageWindow.darken();
  await refreshConversation(props, 100);

  activeLeftMessageWindowWithFace(props, 'Gai');
  props.view.dom.leftMessageWindow.messages(
    ['ガイ', '「よろしくお願いします」']
  );
  props.view.dom.leftMessageWindow.scrollUp();
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「よろしくお願いします」']
  ]);
  invisibleAllMessageWindows(props);
};

/**
 * ストーリー ダメージレースイーブン
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const damageRaceEven = async (props: CustomBattleEventProps) => {
  activeLeftMessageWindowWithFace(props, 'Gai');
  await scrollLeftMessages(props, [
    ['ガイ', '「ダメージレースはイーブンか'],
    ['面白い そうこなくてはな」'],
  ]);
  await refreshConversation(props);
};

/**
 * ストーリー ダメージレース有利
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const damageRaceAdvantage = async (props: CustomBattleEventProps) => {
  activeLeftMessageWindowWithFace(props, 'Gai');
  await scrollLeftMessages(props, [
    ['ガイ', '「何？ 俺がダメージレースで負けているだと'],
    ['少しは本気を出さんとな」'],
  ]);
  await refreshConversation(props);
};

/**
 * ストーリー ダメージレース不利
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const damageRaceDisadvantage = async (props: CustomBattleEventProps) => {
  activeLeftMessageWindowWithFace(props, 'Gai');
  await scrollLeftMessages(props, [
    ['ガイ', '「フハハハハ 見ろシンヤ！！'],
    ['ダメージレースは俺の優勢'],
    ['このまま勝利をいただくぞ」'],
  ]);
  await refreshConversation(props);
};

/**
 * ストーリー ダメージレース
 * @param props イベントプロパティ
 * @param playerHP プレイヤーHP
 * @param enemyHP 敵HP
 * @return ストーリーが完了したら発火するPromise
 */
const damageRace = async (props: CustomBattleEventProps, playerHP: number, enemyHP: number) => {
  const hpDiff = playerHP - enemyHP;
  const isHpNearlyEqual = Math.abs(hpDiff) <= 500;
  if (isHpNearlyEqual) {
    await damageRaceEven(props);
  } else if (0 < hpDiff) {
    await damageRaceAdvantage(props);
  } else if (hpDiff < 0) {
    await damageRaceDisadvantage(props);
  }
};

/**
 * ストーリー 0バッテリーチャンス
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const zeroBatteryChance = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Tsubasa');
  await scrollRightMessages(props, [
    ['ツバサ', '「ガイ君のバッテリーが0になった'],
    ['シンヤ 今こそ攻撃のチャンスだ」'],
  ]);
  await refreshConversation(props, 100);

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「……どうして相手のバッテリーが0だとチャンスなんスか」'],
  ]);
  await refreshConversation(props, 100);

  activeRightMessageWindowWithFace(props, 'Tsubasa');
  await scrollRightMessages(props, [
    ['ツバサ', '「いい質問だな シンヤ'],
    ['0防御すると HPが満タンでも一撃で死ぬダメージを受けるんだ」']
  ]);
  await refreshConversation(props, 100);

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「なるほど 0防御は即死ってことッスね'],
    ['じゃあ このまま一気に決めるッス」']
  ]);
  invisibleAllMessageWindows(props);
};

/**
 * ストーリー 0防御勝利
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const zeroDefenseWin = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Tsubasa');
  await scrollRightMessages(props, [
    ['ツバサ', '「そこまで!!'],
    ['勝者 シンヤ」']
  ]);
  await refreshConversation(props);

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「やった デビュー戦で勝てたッス」'],
  ]);props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, 'Gai');
  await scrollLeftMessages(props, [
    ['ガイ', '「バカな この俺が負けるなんて'],
    ['……シンヤ 貴様の名前 覚えたからな」']
  ]);
  props.view.dom.leftMessageWindow.darken();
};

/**
 * ストーリー プレイヤー敗北
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const playerLose = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Tsubasa');
  await scrollRightMessages(props, [
    ['ツバサ', '「そこまで!!'],
    ['勝者 ガイ」']
  ]);
  await refreshConversation(props);

  activeLeftMessageWindowWithFace(props, 'Gai');
  await scrollLeftMessages(props, [
    ['ガイ', '「強豪校といっても 所詮はこの程度か」'],
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「……手も足も出なかったッス」'],
  ]);
  props.view.dom.rightMessageWindow.darken();
};

/**
 * ストーリー 試合終了の礼
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const gameEndThanks = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Tsubasa');
  await scrollRightMessages(props, [
    ['ツバサ', '「これにて台東高校 大田高校の合同練習試合を終了する'],
    ['一同 姿勢を正して 礼!!」'],
  ]);
  await refreshConversation(props, 100);

  activeLeftMessageWindowWithFace(props, 'Gai');
  props.view.dom.leftMessageWindow.messages(['ガイ', '「ありがとうございました」']);
  props.view.dom.leftMessageWindow.scrollUp();
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「ありがとうございました」']
  ]);
  invisibleAllMessageWindows(props);
};

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

/** バースト注釈 */
const shouldBurst = [
  'このまま0防御すると負け確定だ',
  'バーストでバッテリーを回復しよう'
];

/** パイロットスキル注釈 */
const shouldPilotSkill = [
  'このまま0防御すると負け確定だ',
  'パイロットスキルを発動してバッテリーを回復しよう'
];

/** 選択可能なコマンド */
type SelectableCommands = 'BurstOnly' | 'PilotSkillOnly' | 'All';

/** ゼロ防御チュートリアル */
class ZeroDefenseTutorialEvent extends EmptyCustomBattleEvent {
  /** ステートヒストリー、 beforeLastState開始時に更新される */
  stateHistory: GameState[];
  /** 選択可能なコマンド */
  selectableCommands: SelectableCommands;
  /** イントロダクションを再生したか、trueで再生した */
  isIntroductionComplete: boolean;
  /** ダメージレースストーリーを再生したか、trueで再生した */
  isDamageRaceComplete: boolean;

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.stateHistory = [];
    this.selectableCommands = 'All';
    this.isIntroductionComplete = false;
    this.isDamageRaceComplete = false;
  }

  /** @override */
  async beforeLastState(props: LastState): Promise<void> {
    this.stateHistory = [...this.stateHistory, ...props.update];
    if (!this.isIntroductionComplete) {
      await introduction(props);
      this.isIntroductionComplete = true;
    }

    const isGameEnd = props.update.filter(v => v.effect.name === 'GameEnd').length > 0;
    const foundLastBattle = props.update.find(v => v.effect.name === 'Battle');
    const battlePlayer = (foundLastBattle?.players ?? []).find(v => v.playerId === props.playerId);
    const battleEnemy = (foundLastBattle?.players ?? []).find(v => v.playerId !== props.playerId);
    const lastBattle = foundLastBattle && foundLastBattle.effect.name === 'Battle' && battlePlayer && battleEnemy
      ? {isAttacker: foundLastBattle.effect.attacker === props.playerId,
        playerHP: battlePlayer.armdozer.hp,
        enemyHP: battleEnemy.armdozer.hp}
      : null;
    if (lastBattle && !lastBattle.isAttacker && !isGameEnd && !this.isDamageRaceComplete) {
      this.isDamageRaceComplete = true;
      await damageRace(props, lastBattle.playerHP, lastBattle.enemyHP);
    }

    const foundLastState = props.update[props.update.length - 1];
    const latestEnemy = (foundLastState?.players?? []).find(v => v.playerId !== props.playerId);
    const lastState = foundLastState && latestEnemy
      ? {isPlayerTurn: foundLastState.activePlayerId === props.playerId,
        isZeroBatteryChange: latestEnemy.armdozer.battery === 0 && 0 < latestEnemy.armdozer.hp,
        enemyState: latestEnemy}
      : null;
    if (lastState && lastState.isPlayerTurn && lastState.isZeroBatteryChange && !isGameEnd) {
      await zeroBatteryChance(props);
    }
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
    if (isZeroBatteryCommand && lastState && lastState.isEnemyTurn && lastPlayer && !lastPlayer.isZeroBattery) {
      await cancelZeroBatteryDefense(props);
      return {isCommandCanceled: true};
    } else if (isZeroBatteryCommand && lastState && lastState.isEnemyTurn && lastPlayer && lastPlayer.isZeroBattery && lastPlayer.enableBurst) {
      this.selectableCommands = 'BurstOnly';
      await doBurstBecauseZeroBattery(props);
      unattentionBurstButton(props);
      await focusInBurstButton(props, shouldBurst);
      return {isCommandCanceled: true};
    } else if (isZeroBatteryCommand && lastState && lastState.isEnemyTurn && lastPlayer && lastPlayer.isZeroBattery 
      && !lastPlayer.enableBurst && lastPlayer.enablePilotSkill)
    {
      this.selectableCommands = 'PilotSkillOnly';
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
    if (!enableBurstCommand.includes(this.selectableCommands)) {
      return {isCommandCanceled: true};
    }

    if (this.selectableCommands === 'BurstOnly') {
      this.selectableCommands = 'All';
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