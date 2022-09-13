// @flow
import type {GameState} from "gbraver-burst-core/lib/state/game-state";
import type {
  BatteryCommandSelected,
  BurstCommandSelected,
  CommandCanceled,
  CustomBattleEvent,
  CustomBattleEventProps,
  LastState,
  PilotSkillCommandSelected,
} from "../game/td-scenes/battle/custom-battle-event";
import {activeLeftMessageWindowWithFace, activeRightMessageWindowWithFace} from "./active-message-window";
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
  activeLeftMessageWindowWithFace(props, 'Raito');
  await scrollLeftMessages(props, [
    ['ライト', '「さすがは大田高校はん 一瞬で勝負がついてしもたな'],
    ['どや まだ道路の占有時間も残っとるし ワイともう一戦やりまへんか」']
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, 'Tsubasa');
  await scrollRightMessages(props, [
    ['ツバサ', '「少し待ってくれ」'],
  ]);
  await refreshConversation(props);

  activeRightMessageWindowWithFace(props, 'Tsubasa');
  await scrollRightMessages(props, [
    ['ツバサ', '「監督からもGoサインが出た'],
    ['シンヤ 悪いがもう一戦だけ頑張ってくれ」']
  ]);
  await refreshConversation(props, 100);

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「了解ッス」'],
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, 'Raito');
  await scrollLeftMessages(props, [
    ['ライト', '「ほないくで 大田高校のエース君」']
  ]);
  await refreshConversation(props, 100);

  activeLeftMessageWindowWithFace(props, 'Gai');
  await scrollLeftMessages(props, [
    ['ガイ', '「双方 姿勢を正して 礼!!」'],
  ]);
  await refreshConversation(props, 100);

  activeLeftMessageWindowWithFace(props, 'Raito');
  props.view.dom.leftMessageWindow.messages(
    ['ライト', '「よろしくお願いします」']
  );
  props.view.dom.leftMessageWindow.scrollUp();
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「よろしくお願いします」']
  ]);
  invisibleAllMessageWindows(props);
};

/**
 * ストーリー ダメージ反射成功
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const successReflectDamage = async (props: CustomBattleEventProps) => {
  activeLeftMessageWindowWithFace(props, 'Raito');
  await scrollLeftMessages(props, [
    ['ライト', '「かかったな大田高校'],
    ['これぞ奥義 電撃バリアや」']
  ]);
  invisibleAllMessageWindows(props);
};

/**
 * ストーリー ダメージ反射失敗
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const failReflectDamage = async (props: CustomBattleEventProps) => {
  activeLeftMessageWindowWithFace(props, 'Raito');
  await scrollLeftMessages(props, [
    ['ライト', '「さすが大田高校はん'],
    ['この程度の小細工は通用せぇへんか」']
  ]);
  invisibleAllMessageWindows(props);
};

/**
 * ストーリー 5防御しないと負け
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const shouldDefense5 = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Tsubasa');
  await scrollRightMessages(props, [
    ['ツバサ', '「待て シンヤ'],
    ['あと一撃でも食らえば 君の負けだぞ'],
    ['ライトは恐らく4攻撃をしてくるから 5防御で回避するんだ」'],
  ]);
  await refreshConversation(props, 100);
};

/**
 * ストーリー 5防御するためにバッテリー選択キャンセル
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const redoBatterySelect = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「了解ッス'],
    ['5防御で回避すればいいんスね」']
  ]);
  await refreshConversation(props, 100);
};

/**
 * ストーリー バーストでバッテリー回復
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const doBurstToRecoverBattery = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「でもツバサ先輩 俺のバッテリーは5もないッスよ」'],
  ]);
  await refreshConversation(props, 100);

  activeRightMessageWindowWithFace(props, 'Tsubasa');
  await scrollRightMessages(props, [
    ['ツバサ', '「ならばバーストを発動させよう'],
    ['バーストは1試合に1回しか使えないが 一気にバッテリーを回復できるんだ」'],
  ]);
  invisibleAllMessageWindows(props);
};

/**
 * ストーリー パイロットスキルでバッテリー回復
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const doPilotSkillToRecoverBattery = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「でもツバサ先輩 俺のバッテリーは5もないッスよ」'],
  ]);
  await refreshConversation(props, 100);

  activeRightMessageWindowWithFace(props, 'Tsubasa');
  await scrollRightMessages(props, [
    ['ツバサ', '「ならばパイロットスキルでバッテリーを回復させよう」'],
  ]);
  invisibleAllMessageWindows(props);
};

/**
 * ストーリー バースト、パイロットスキルが使えないのでバッテリー変更なし
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const canNotChangeBattery = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「でもツバサ先輩 俺のバッテリーは5もないッスよ」'],
  ]);
  await refreshConversation(props, 100);

  activeRightMessageWindowWithFace(props, 'Tsubasa');
  await scrollRightMessages(props, [
    ['ツバサ', '「ならばバースト発動だ ……と言いたいところだが発動済か'],
    ['こうなればパイロットスキル ……も使い切ったか'],
    ['すまんシンヤ これ以上打つ手なしだ」']
  ]);
  invisibleAllMessageWindows(props);
};

/**
 * ストーリー 5防御しないと負け（2回目以降）
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const shouldDefense5Again = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Tsubasa');
  await scrollRightMessages(props, [
    ['ツバサ', '「シンヤ さっきも説明したが 今は5防御しないとまずい」']
  ]);
  await refreshConversation(props, 100);
};

/**
 * ストーリー うっかり5防御以外を選択
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const notDefense5Carelessly = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「すみませんッス うっかりしてたッス」'],
  ]);
  invisibleAllMessageWindows(props);
};

/**
 * ストーリー プレイヤーの勝利
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const playerWin = async (props: CustomBattleEventProps) => {
  activeLeftMessageWindowWithFace(props, 'Gai');
  await scrollLeftMessages(props, [
    ['ガイ', '「やめ!!'],
    ['この試合 ……シンヤの勝ち']
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「やった 上級生に勝てたッス」'],
  ]);
  await refreshConversation(props);

  activeLeftMessageWindowWithFace(props, 'Raito');
  await scrollLeftMessages(props, [
    ['ライト', '「下級生やと思て 舐めとったわ'],
    ['さすがやな 大田高校」']
  ]);
  await refreshConversation(props);

  activeLeftMessageWindowWithFace(props, 'Gai');
  await scrollLeftMessages(props, [
    ['ガイ', '「双方 姿勢を正して 礼!!」'],
  ]);
  await refreshConversation(props, 100);

  activeLeftMessageWindowWithFace(props, 'Raito');
  props.view.dom.leftMessageWindow.messages(
    ['ライト', '「ありがとうございました」']
  );
  props.view.dom.leftMessageWindow.scrollUp();
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「ありがとうございました」']
  ]);
  invisibleAllMessageWindows(props);
};

/**
 * ストーリー プレイヤーの敗北
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const playerLose = async (props: CustomBattleEventProps) => {
  activeLeftMessageWindowWithFace(props, 'Gai');
  await scrollLeftMessages(props, [
    ['ガイ', '「やめ!!'],
    ['この試合 ライト先輩の勝ち!!']
  ]);

  activeLeftMessageWindowWithFace(props, 'Raito');
  await scrollLeftMessages(props, [
    ['ライト', '「どや大田高校 これが台東高校の実力や」'],
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「……これが上級生の力」'],
  ]);
  await refreshConversation(props);

  activeLeftMessageWindowWithFace(props, 'Gai');
  await scrollLeftMessages(props, [
    ['ガイ', '「双方 姿勢を正して 礼!!」'],
  ]);
  await refreshConversation(props, 100);

  activeLeftMessageWindowWithFace(props, 'Raito');
  props.view.dom.leftMessageWindow.messages(
    ['ライト', '「ありがとうございました」']
  );
  props.view.dom.leftMessageWindow.scrollUp();
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「ありがとうございました」']
  ]);
  invisibleAllMessageWindows(props);
};

/** バースト注釈 */
const shouldBurst = [
  'ライトさん4攻撃をしかけてくる',
  'バーストでバッテリー回復して5防御しよう'
];

/** パイロットスキル注釈 */
const shouldPilotSkill = [
  'ライトさんは4攻撃をしかけてくる',
  'パイロットスキルでバッテリー回復して5防御しよう'
];

/** 選択可能なコマンド */
type SelectableCommands = 'BurstOnly' | 'PilotSkillOnly' | 'All';

/** バーストチュートリアル用のカスタムバトルイベント */
class BurstTutorial extends EmptyCustomBattleEvent {
  /** ステートヒストリー、 beforeLastState開始時に更新される */
  stateHistory: GameState[];
  /** イントロダクションを再生したか、trueで再生した */
  isIntroductionComplete: boolean;
  /** 5防御しないと負けを再生したか、trueで再生した */
  isLoseIfNoDefense5Complete: boolean;
  /** 選択可能なコマンド */
  selectableCommands: SelectableCommands;

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.stateHistory = [];
    this.isIntroductionComplete = false;
    this.isLoseIfNoDefense5Complete = false;
    this.selectableCommands = 'All';
  }

  /** @override */
  async beforeLastState(props: LastState): Promise<void> {
    this.stateHistory = [...this.stateHistory, ...props.update];
    if (!this.isIntroductionComplete) {
      await introduction(props);
      this.isIntroductionComplete = true;
    }

    const foundLastBattle = props.update.find(v => v.effect.name === 'Battle');
    const lastBattlePlayer = (foundLastBattle?.players ?? []).find(v => v.playerId === props.playerId);
    const lastBattleEnemy = (foundLastBattle?.players ?? []).find(v => v.playerId !== props.playerId);
    const lastBattle = foundLastBattle && foundLastBattle.effect.name === 'Battle' && lastBattlePlayer && lastBattleEnemy
      ? {isAttacker: foundLastBattle.effect.attacker === props.playerId,
        hasEnemyTryReflect: 0 < lastBattleEnemy.armdozer.effects.filter(v => v.type === 'TryReflect').length}
      : null;
    const successReflect = props.update
      .filter(v => v.effect.name === 'Reflect' && v.effect.damagedPlayer === props.playerId)
      .length > 0;
    if (lastBattle && lastBattle.isAttacker && lastBattle.hasEnemyTryReflect && successReflect) {
      await successReflectDamage(props);
    } else if (lastBattle && lastBattle.isAttacker && lastBattle.hasEnemyTryReflect && !successReflect) {
      await failReflectDamage(props);
    }
  }

  /** @override */
  async onBatteryCommandSelected(props: BatteryCommandSelected): Promise<CommandCanceled> {
    const enableBurstCommand: SelectableCommands[] = ['All'];
    if (!enableBurstCommand.includes(this.selectableCommands)) {
      return {isCommandCanceled: true};
    }

    const foundLastState = this.stateHistory[this.stateHistory.length - 1];
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
      this.isLoseIfNoDefense5Complete ? await shouldDefense5Again(props) : await shouldDefense5(props);
    };
    if (notBattery5 && lastState && lastState.isEnemyTurn && lastState.isHpLessThanEnemyPower && lastState.isEnemyFullBattery
      && !lastState.isPlayerFullBattery && lastState.enableBurst)
    {
      await defense5(props);
      this.isLoseIfNoDefense5Complete = true;
      await doBurstToRecoverBattery(props);
      await focusInBurstButton(props, shouldBurst);
      this.selectableCommands = 'BurstOnly';
      return {isCommandCanceled: true};
    } else if (notBattery5 && lastState && lastState.isEnemyTurn && lastState.isHpLessThanEnemyPower && lastState.isEnemyFullBattery
      && !lastState.isPlayerFullBattery && !lastState.enableBurst && lastState.enablePilotSkill)
    {
      await defense5(props);
      this.isLoseIfNoDefense5Complete = true;
      await doPilotSkillToRecoverBattery(props);
      await focusInPilotButton(props, shouldPilotSkill);
      this.selectableCommands = 'PilotSkillOnly';
      return {isCommandCanceled: true};
    } else if (notBattery5 && lastState && lastState.isEnemyTurn && lastState.isHpLessThanEnemyPower && lastState.isEnemyFullBattery
      && !lastState.isPlayerFullBattery && !lastState.enableBurst && !lastState.enablePilotSkill)
    {
      await defense5(props);
      this.isLoseIfNoDefense5Complete = true;
      await canNotChangeBattery(props);
      return {isCommandCanceled: false};
    } else if (notBattery5 && lastState && lastState.isEnemyTurn && lastState.isHpLessThanEnemyPower && lastState.isEnemyFullBattery
      && lastState.isPlayerFullBattery)
    {
      await defense5(props);
      this.isLoseIfNoDefense5Complete ? await notDefense5Carelessly(props) : await redoBatterySelect(props);
      this.isLoseIfNoDefense5Complete = true;
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
    const enablePilotSkillCommand: SelectableCommands[] = ['PilotSkillOnly', 'All'];
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
 * バーストチュートリアル用のカスタムバトルイベントを生成する
 * 
 * @return 生成したカスタムバトルイベント
 */
export function createBurstTutorialEvent(): CustomBattleEvent {
  return new BurstTutorial();
}