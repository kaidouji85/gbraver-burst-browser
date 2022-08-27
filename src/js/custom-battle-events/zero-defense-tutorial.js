// @flow
import type {BattleResult, GameState} from "gbraver-burst-core";
import type {CustomBattleEvent, CustomBattleEventProps, LastState} from "../game/td-scenes/battle/custom-battle-event";
import {activeLeftMessageWindowWithFace, activeRightMessageWindowWithFace} from "./active-message-window";
import {EmptyCustomBattleEvent} from "./empty-custom-battle-event";
import {invisibleAllMessageWindows, refreshConversation} from "./invisible-all-message-windows";
import {scrollLeftMessages, scrollRightMessages} from "./scroll-messages";
import {turnCount} from "./turn-count";

/**
 * ストーリー 冒頭
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const introduction = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Tsubasa');
  await scrollRightMessages(props, [
    ['ツバサ', '「これより台東高校、大田高校の合同練習試合を始める'],
    ['一同 姿勢を正して 礼!!」']
  ]);
  props.view.dom.leftMessageWindow.darken();
  await refreshConversation(props, 100);

  activeLeftMessageWindowWithFace(props, 'Gai');
  props.view.dom.leftMessageWindow.messages(['ガイ', '「よろしくお願いします」']);
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「よろしくお願いしますッス」']
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
    ['ガイ', '「やるな大田高校 想定以上のダメージだ」'],
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
    ['ガイ', '「甘いぞ大田高校 ガードでダメージ半減だ」'],
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
    ['ガイ', '「どうした大田高校 お前たちの実力はそんなものか」'],
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
    ['シンヤ', '「なんてダメージだ」'],
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, 'Gai');
  await scrollLeftMessages(props, [
    ['ガイ', '「5攻撃は絶対に当たる'],
    ['このまま勝負を決めさせてもらうぞ」'],
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
    ['ガイ', '「この攻撃をガードするとは さすが大田高校だ」'],
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
    ['ガイ', '「俺の動きが読まれただと」'],
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

/** ゼロ防御チュートリアル */
class ZeroDefenseTutorialEvent extends EmptyCustomBattleEvent {
  /** ステートヒストリー、 beforeLastState開始時に更新される */
  stateHistory: GameState[];

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.stateHistory = [];
  }

  /** @override */
  async beforeLastState(props: LastState): Promise<void> {
    this.stateHistory = [...this.stateHistory, ...props.update];
    const turn = turnCount(this.stateHistory);
    const foundLastBattle = props.update.find(v => v.effect.name === 'Battle');
    const lastBattle = foundLastBattle && foundLastBattle.effect.name === 'Battle'
      ? {isAttacker: foundLastBattle.effect.attacker === props.playerId, result: foundLastBattle.effect.result}
      : null;
    if (turn === 1) {
      await introduction(props);
    } else if (lastBattle && lastBattle.isAttacker) {
      await playerAttack(props, lastBattle.result);
    } else if (lastBattle && !lastBattle.isAttacker) {
      await enemyAttack(props, lastBattle.result);
    }
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