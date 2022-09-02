// @flow
import type {BattleResult, GameState} from "gbraver-burst-core";
import type {
  BatteryCommandSelected,
  BurstCommandSelected, 
  CommandCanceled,
  CustomBattleEvent,
  CustomBattleEventProps,
  LastState,
  PilotSkillCommandSelected
} from "../game/td-scenes/battle/custom-battle-event";
import {activeLeftMessageWindowWithFace, activeRightMessageWindowWithFace} from "./active-message-window";
import {unattentionBurstButton, unattentionPilotButton} from "./attention";
import {EmptyCustomBattleEvent} from "./empty-custom-battle-event";
import {focusInBurstButton, focusInPilotButton, focusOutBurstButton, focusOutPilotButton} from "./focus";
import {invisibleAllMessageWindows, refreshConversation} from "./invisible-all-message-windows";
import {scrollLeftMessages, scrollRightMessages} from "./scroll-messages";

/**
 * ストーリー 冒頭
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const introduction = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Tsubasa');
  await scrollRightMessages(props, [
    ['ツバサ', '「これより台東高校 大田高校の合同練習試合を始める'],
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
  await refreshConversation(props, 100);

  activeRightMessageWindowWithFace(props, 'Tsubasa');
  await scrollRightMessages(props, [
    ['ツバサ', '「相手は台東高校 期待のルーキーだ'],
    ['シンヤ 油断は禁物だぞ」']
  ]);
  await refreshConversation(props, 100);

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「了解ッス'],
    ['大田高校の底力を見せてやるッス」']
  ]);
  invisibleAllMessageWindows(props);
};

/**
 * ストーリー プレイヤー攻撃ヒット
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const playerAttackHit = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「よし 手応えあり」'],
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, 'Gai');
  await scrollLeftMessages(props, [
    ['ガイ', '「やるな 大田高校'],
    ['想定以上のダメージだ」']
  ]);
  props.view.dom.leftMessageWindow.darken();
  invisibleAllMessageWindows(props);
};

/**
 * ストーリー プレイヤー攻撃ガード
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const playerAttackGuard = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「どうだ 攻撃ヒット」'],
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, 'Gai');
  await scrollLeftMessages(props, [
    ['ガイ', '「甘いぞ 大田高校'],
    ['ガードでダメージ半減だ」']
  ]);
  props.view.dom.leftMessageWindow.darken();
  invisibleAllMessageWindows(props);
};

/**
 * ストーリー プレイヤー攻撃ミス
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const playerAttackMiss = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「避けられた」'],
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, 'Gai');
  await scrollLeftMessages(props, [
    ['ガイ', '「どうした 大田高校'],
    ['お前たちの力はその程度か」']
  ]);
  props.view.dom.leftMessageWindow.darken();
  invisibleAllMessageWindows(props);
};

/**
 * ストーリー プレイヤーフェイント成功
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const playerFeintSuccess = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「どうだ フェイント成功」'],
  ]);
  props.view.dom.rightMessageWindow.darken();


  activeLeftMessageWindowWithFace(props, 'Gai');
  await scrollLeftMessages(props, [
    ['ガイ', '「調子に乗るなよ 大田高校'],
    ['この程度の損害なら どうにもでなる」']
  ]);
  props.view.dom.leftMessageWindow.darken();
  invisibleAllMessageWindows(props);
};

/**
 * ストーリー プレイヤーフェイントミス
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const playerFeintMiss = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「なに フェイントが読まれた」'],
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, 'Gai');
  await scrollLeftMessages(props, [
    ['ガイ', '「舐めるなよ 大田高校'],
    ['そんな小細工 俺には通用しないぞ」']
  ]);
  props.view.dom.leftMessageWindow.darken();
  invisibleAllMessageWindows(props);
};

/**
 * プレイヤー攻撃の結果に応じてストーリーを分岐する
 * @param props イベントプロパティ
 * @param battleResult 戦闘結果
 * @return ストーリーが完了したら発火するPromise
 */
const playerAttack = async (props: CustomBattleEventProps, battleResult: BattleResult) => {
  if (battleResult.name === 'NormalHit') {
    await playerAttackHit(props);
  } else if (battleResult.name === 'Guard') {
    await playerAttackGuard(props);
  } else if (battleResult.name === 'Miss') {
    await playerAttackMiss(props);
  } else if (battleResult.name === 'Feint' && battleResult.isDefenderMoved) {
    await playerFeintSuccess(props);
  } else if (battleResult.name === 'Feint' && !battleResult.isDefenderMoved) {
    await playerFeintMiss(props);
  }
};

/**
 * ストーリー 敵攻撃ヒット
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const enemyAttackHit = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「すごいダメージだ」'],
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, 'Gai');
  await scrollLeftMessages(props, [
    ['ガイ', '「5攻撃は絶対に当たる'],
    ['次で終わりだ 大田高校」'],
  ]);
  props.view.dom.leftMessageWindow.darken();
  invisibleAllMessageWindows(props);
};

/**
 * ストーリー 敵攻撃ガード
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const enemyAttackGuard = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「ガードが間に合った」'],
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, 'Gai');
  await scrollLeftMessages(props, [
    ['ガイ', '「さすがだ 大田高校'],
    ['この攻撃をガードするとはな」']
  ]);
  props.view.dom.leftMessageWindow.darken();
  invisibleAllMessageWindows(props);
};

/**
 * ストーリー 敵攻撃ミス
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const enemyAttackMiss = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「回避成功」'],
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, 'Gai');
  await scrollLeftMessages(props, [
    ['ガイ', '「少しは出来るな 大田高校'],
    ['俺の動きを読むとはな」']
  ]);
  props.view.dom.leftMessageWindow.darken();
  invisibleAllMessageWindows(props);
};

/**
 * 敵攻撃の結果に応じてストーリーを分岐する
 * @param props イベントプロパティ
 * @param battleResult 戦闘結果
 * @return ストーリーが完了したら発火するPromise
 */
const enemyAttack = async (props: CustomBattleEventProps, battleResult: BattleResult) => {
  if (battleResult.name === 'NormalHit') {
    await enemyAttackHit(props);
  } else if (battleResult.name === 'Guard') {
    await enemyAttackGuard(props);
  } else if (battleResult.name === 'Miss') {
    await enemyAttackMiss(props);
  }
}

/**
 * ストーリー 0バッテリーチャンス
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const zeroBatteryChance = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Tsubasa');
  await scrollRightMessages(props, [
    ['ツバサ', '「台東高校のバッテリーが0になった'],
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
    ['台東高校 機能停止'],
    ['勝者 大田高校」']
  ]);
  await refreshConversation(props);

  activeLeftMessageWindowWithFace(props, 'Gai');
  await scrollLeftMessages(props, [
    ['ガイ', '「バカな 途中まで俺が有利だったのに」'],
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「……これが0防御の破壊力」'],
  ]);props.view.dom.rightMessageWindow.darken();
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
    ['大田高校 機能停止'],
    ['勝者 台東高校」']
  ]);
  await refreshConversation(props);

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「クッ もう少しで勝てたのに」'],
  ]);props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, 'Gai');
  await scrollLeftMessages(props, [
    ['ガイ', '「見たか 大田高校'],
    ['これが台東高校の実力だ」']
  ]);
  props.view.dom.leftMessageWindow.darken();
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
    ['ならば君の秘められた力 パイロットスキルを発動するんだ」']
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
    ['ならば君の秘められた力 パイロットスキル'],
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
    ['シンヤ', '「そんなあ」'],
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

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.stateHistory = [];
    this.selectableCommands = 'All';
    this.isIntroductionComplete = false;
  }

  /** @override */
  async beforeLastState(props: LastState): Promise<void> {
    this.stateHistory = [...this.stateHistory, ...props.update];
    const foundLastBattle = props.update.find(v => v.effect.name === 'Battle');
    const lastBattle = foundLastBattle && foundLastBattle.effect.name === 'Battle'
      ? {isAttacker: foundLastBattle.effect.attacker === props.playerId, result: foundLastBattle.effect.result}
      : null;
    const isGameEnd = props.update.filter(v => v.effect.name === 'GameEnd').length > 0;
    const foundLastState = props.update[props.update.length - 1];
    const foundEnemyState = foundLastState
      ? foundLastState.players.find(v => v.playerId !== props.playerId)
      : null;
    const lastState = foundLastState && foundEnemyState
      ? {isPlayerTurn: foundLastState.activePlayerId === props.playerId, enemyState: foundEnemyState}
      : null;
    const isZeroBatteryChance = lastState && lastState.isPlayerTurn && lastState.enemyState.armdozer.battery === 0
      && 0 < lastState.enemyState.armdozer.hp;
    if (!this.isIntroductionComplete) {
      await introduction(props);
      this.isIntroductionComplete = true;
    } else if (lastBattle && !lastBattle.isAttacker  && !isGameEnd && isZeroBatteryChance) {
      await enemyAttack(props, lastBattle.result);
      await refreshConversation(props);
      await zeroBatteryChance(props);
    } else if (lastBattle && lastBattle.isAttacker && !isGameEnd) {
      await playerAttack(props, lastBattle.result);
    } else if (lastBattle && !lastBattle.isAttacker  && !isGameEnd) {
      await enemyAttack(props, lastBattle.result);
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