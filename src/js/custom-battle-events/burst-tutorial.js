// @flow
import type {GameState} from "gbraver-burst-core/lib/state/game-state";
import type {CustomBattleEvent, CustomBattleEventProps, LastState} from "../game/td-scenes/battle/custom-battle-event";
import {waitTime} from "../wait/wait-time";
import {activeLeftMessageWindowWithFace, activeRightMessageWindowWithFace} from "./active-message-window";
import {EmptyCustomBattleEvent} from "./empty-custom-battle-event";
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
    ['ツバサ', '「相談するから 少し待ってくれ」'],
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
    ['これぞ奥義 バーストや」']
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
const loseIfNoDefense5 = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Tsubasa');
  await scrollRightMessages(props, [
    ['ツバサ', '「シンヤ この状況はまずい'],
    ['あと一撃でも食らえば 君のHPは0だぞ']
  ]);
  await refreshConversation(props, 100);

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「しかも よく見ると台東高校のバッテリーは5じゃないスか'],
    ['絶対ヒットの5攻撃をされたら終わりッス」']
  ]);
  await refreshConversation(props, 100);

  activeRightMessageWindowWithFace(props, 'Tsubasa');
  await scrollRightMessages(props, [
    ['ツバサ', '「落ち着け シンヤ'],
    ['攻撃 防御で同じバッテリーを出した場合 ガードでダメージが半減される'],
    ['5防御のダメージ半減で この場を凌ぐんだ」']
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
    ['バーストは1試合に1回しか使えないが 一気にバッテリーが回復できるんだ」'],
  ]);
  await refreshConversation(props, 100);

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「了解ッス'],
    ['バーストでバッテリー回復すればいいんスね']
  ]);
  invisibleAllMessageWindows(props);
  await waitTime(200);
};

/** バーストチュートリアル用のカスタムバトルイベント */
class BurstTutorial extends EmptyCustomBattleEvent {
  /** ステートヒストリー、 beforeLastState開始時に更新される */
  stateHistory: GameState[];
  /** イントロダクションを再生したか、trueで再生した */
  isIntroductionComplete: boolean;
  /**
   * コンストラクタ
   */
  constructor() {
    super();
    this.stateHistory = [];
    this.isIntroductionComplete = false;
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

    const foundLastState = props.update[props.update.length - 1];
    const latestPlayer = (foundLastState?.players ?? []).find(v => v.playerId === props.playerId);
    const latestEnemy = (foundLastState?.players ?? []).find(v => v.playerId !== props.playerId);
    const lastState = foundLastState && latestPlayer && latestEnemy
      ? {isEnemyTurn: foundLastState.activePlayerId !== props.playerId,
        isHpLessThanEnemyPower: latestPlayer.armdozer.hp <= latestEnemy.armdozer.power,
        enableBurst: latestPlayer.armdozer.enableBurst}
      : null;
    if (lastState && lastState.isEnemyTurn && lastState.isHpLessThanEnemyPower) {
      await loseIfNoDefense5(props);
      if (lastState.enableBurst) {
        await doBurstToRecoverBattery(props);
      }
    }
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