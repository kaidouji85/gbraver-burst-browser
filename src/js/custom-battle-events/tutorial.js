// @flow
import type {Battle, BattleResult, GameEnd, GameState, Player} from "gbraver-burst-core";
import {ArmDozerIdList, ArmDozers, PilotIds, Pilots} from "gbraver-burst-core";
import type {
  BatteryCommandSelected,
  BattleSceneProps,
  CommandCanceled,
  CustomBattleEvent,
  LastState,
} from "../game/td-scenes/battle/custom-battle-event";
import type {NPC} from "../npc/npc";
import {oneBatteryWeakWingDozerNPC} from "../npc/one-battery";
import {playerUuid} from "../uuid/player";
import {waitTime} from "../wait/wait-time";
import {
  activeLeftMessageWindow,
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace
} from "./active-message-window";
import {attentionBatterySelector} from "./attention";
import {EmptyCustomBattleEvent} from "./empty-custom-battle-event";
import {invisibleAllMessageWindows} from "./invisible-all-message-windows";
import {scrollLeftMessages, scrollRightMessages} from "./scroll-messages";
import {turnCount} from "./turn-count";

/**
 * 会話を仕切りなおす
 * 
 * @param props イベントプロパティ
 * @return 仕切り直しが完了したら発火するPromise
 */
const refreshConversation = async (props: BattleSceneProps) => {
  invisibleAllMessageWindows(props);
  await waitTime(200);
};

/**
 * ストーリー 冒頭
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const introduction = async (props: BattleSceneProps) => {
  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  await scrollLeftMessages(props, [
    ['ツバサ', '「これより 操縦訓練を開始する'],
    ['姿勢を正して 礼!!」']
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「よろしくお願いします」']
  ]);
  props.view.dom.rightMessageWindow.darken();

  props.view.dom.leftMessageWindow.lighten();
  await scrollLeftMessages(props, [
    ['ツバサ', '「いい返事だな では早速はじめよう'],
    ['試合の基本は 攻撃側 防御側でバッテリーを出し合うことだ'],
    ['大きいバッテリーを出した側の行動が成功するのだが'],
    ['これは実際にやってみた方が早いな'],
    ['シンヤ 私が防御に回るから 好きに攻撃してみろ」']
  ]);
  props.view.dom.leftMessageWindow.darken();

  props.view.dom.rightMessageWindow.lighten();
  await scrollRightMessages(props, [
    ['シンヤ', '「了解っす '],
    ['それじゃ 遠慮なく いきますよ ツバサ先輩」'],
  ]);
  props.view.dom.rightMessageWindow.darken();
};

/**
 * ストーリー プレイヤー攻撃ヒット
 * @param props イベントプロパティ
 * @return  ストーリーが完了したら発火するPromise
 */
 const playerAttackHit = async (props: BattleSceneProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「手応えあり」']
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  await scrollLeftMessages(props, [
    ['ツバサ', '「見事な攻撃だ シンヤ'],
    ['君が私よりも大きいバッテリーを出したので'],
    ['攻撃がヒットしたぞ」'],
  ]);
  props.view.dom.leftMessageWindow.darken();
};

/**
 * ストーリー プレイヤー攻撃ガード
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const playerAttackGuarded = async (props: BattleSceneProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「よっしゃ 攻撃ヒット」']
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  await scrollLeftMessages(props, [
    ['ツバサ', '「甘いぞ シンヤ」'],
    ['君は私と同じバッテリーを出したので'],
    ['攻撃をガード ダメージを半減させてもらった」'],
  ]);
  props.view.dom.leftMessageWindow.darken();
}

/**
 * ストーリー プレイヤー攻撃ミス
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const playerAttackMiss = async (props: BattleSceneProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「クソッ 避けられた」']
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  await scrollLeftMessages(props, [
    ['ツバサ', '「まだまだ だな シンヤ」'],
    ['私の方が君より大きいバッテリーを出したので'],
    ['攻撃を回避させてもらった」'],
  ]);
  props.view.dom.leftMessageWindow.darken();
};

/**
 * プレイヤー攻撃の結果に応じてストーリーを分岐する
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const playerAttack = async (props: BattleSceneProps, battleResult: BattleResult) => {
  if (battleResult.name === 'NormalHit' || battleResult.name === 'CriticalHit') {
    await playerAttackHit(props);
  } else if (battleResult.name === 'Guard') {
    await playerAttackGuarded(props);
  } else if (battleResult.name === 'Miss' || battleResult.name === 'Feint') {
    await playerAttackMiss(props);
  }
};

/**
 * ストーリー バッテリー基本ルール説明
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const batteryRuleDescription = async (props: BattleSceneProps) => {
  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  await scrollLeftMessages(props, [
    ['ツバサ', '「……と このように 攻撃が当たるかは'],
    ['互いに出したバッテリーの大きさだけで決まるんだ」']
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「なるほど'],
    ['シンプルながらも奥が深いんすね」',]
  ]);
  props.view.dom.rightMessageWindow.darken();

  props.view.dom.leftMessageWindow.lighten();
  await scrollLeftMessages(props, [
    ['ツバサ', '「そうだな'],
    ['バッテリーの攻防配分 これが基本かつ奥義だ'],
    ['では 次は私が攻撃をしかけるので'],
    ['同じ要領で回避してみろ」']
  ]);
  props.view.dom.leftMessageWindow.darken();

  props.view.dom.rightMessageWindow.lighten();
  await scrollRightMessages(props, [
    ['シンヤ', '「了解っす'],
    ['お手柔らかに頼みますよ ツバサ先輩'],
  ]);
  props.view.dom.rightMessageWindow.darken();
};

/**
 * ストーリー 敵攻撃回避
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const enemyAttackMiss = async (props: BattleSceneProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「よし 回避成功」']
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  await scrollLeftMessages(props, [
    ['ツバサ', '「素晴らしいマニューバだ シンヤ'],
    ['私よりも君の方が大きいバッテリーを出したので'],
    ['攻撃を完全回避したぞ']
  ]);
  props.view.dom.leftMessageWindow.darken();
};

/**
 * ストーリー 敵攻撃ガード
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const enemyAttackGuarded = async (props: BattleSceneProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「攻撃が当たったけど 思ったよりダメージがないぞ」']
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  await scrollLeftMessages(props, [
    ['ツバサ', '「ほう 私の攻撃をガードするとはな'],
    ['私と君が同じバッテリーを出したので'],
    ['攻撃をガード ダメージが半減されたな']
  ]);
  props.view.dom.leftMessageWindow.darken();
};

/**
 * ストーリー 敵攻撃ヒット
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const enemyAttackHit = async (props: BattleSceneProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「すごいダメージだ'],
    ['ツバサ先輩 少しは加減してくださいよ']
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  await scrollLeftMessages(props, [
    ['ツバサ', '「すまない これでも手心を加えたつもりなのだがな'],
    ['私の方が君よりも大きいバッテリーを出したので'],
    ['攻撃を当てさせてもらった']
  ]);
  props.view.dom.leftMessageWindow.darken();
};

/**
 * 敵攻撃の結果に応じてストーリーを分岐する
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const enemyAttack = async (props: BattleSceneProps, battleResult: BattleResult) => {
  if (battleResult.name === 'NormalHit' || battleResult.name === 'CriticalHit') {
    await enemyAttackHit(props);
  } else if (battleResult.name === 'Guard') {
    await enemyAttackGuarded(props);
  } else if (battleResult.name === 'Miss' || battleResult.name === 'Feint') {
    await enemyAttackMiss(props);
  }
};

/**
 * ストーリー プレイヤーの勝利
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const victory = async (props: BattleSceneProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「俺の勝ちですよ ツバサ先輩」']
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  await scrollLeftMessages(props, [
    ['ツバサ', '「見事だ シンヤ'],
    ['次の試合には 君も出そうと思う」']
  ]);
  props.view.dom.leftMessageWindow.darken();
  props.view.dom.leftMessageWindow.darken();
}

/**
 * ストーリー プレイヤーの敗北
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const lose = async (props: BattleSceneProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「クソッ あともう少しで勝てたのに」']
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  await scrollLeftMessages(props, [
    ['ツバサ', '「はじめてにしては 悪くなかったぞ'],
    ['これからも精進あるのみだな」']
  ]);
  props.view.dom.leftMessageWindow.darken();
};

/**
 * ストーリー チュートリアル終了
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const tutorialEnd = async (props: BattleSceneProps) => {
  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  await scrollLeftMessages(props, [
    ['ツバサ', '「これにて操縦訓練を終了する'],
    ['姿勢を正して 礼!!」」']
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「ありがとうございました」']
  ]);
  props.view.dom.rightMessageWindow.darken();
};

/**
 * 攻撃バッテリーコマンド以外は選択不可にするヘルパー関数
 * @param props イベントプロパティ 
 */
const attackBatterySelect = async (props: BattleSceneProps) => {
  attentionBatterySelector(props.view);
  invisibleAllMessageWindows(props);
  activeLeftMessageWindow(props);
  props.view.dom.leftMessageWindow.messages([
    '好きなバッテリーで 攻撃してみよう',
    'ツバサ先輩よりも 大きい数字を出せば 攻撃が当たるぞ'
  ]);
  await props.view.hud.gameObjects.frontmostFader.opacity(0.7, 200).play();
};

/**
 * 防御バッテリーコマンド以外は選択不可にするヘルパー関数
 * @param props イベントプロパティ 
 */
const defenseBatterySelect = async (props: BattleSceneProps) => {
  attentionBatterySelector(props.view);
  invisibleAllMessageWindows(props);
  activeLeftMessageWindow(props);
  props.view.dom.leftMessageWindow.messages([
    '好きなバッテリーで 防御してみよう',
    'ツバサ先輩よりも 大きい数字を出せば 完全回避できるぞ'
  ]);
  await props.view.hud.gameObjects.frontmostFader.opacity(0.7, 200).play();
};

/** チュートリアルイベント */
export interface TutorialEvent extends CustomBattleEvent {
  /** プレイヤー情報 */
  player: Player;
  /** NPC */
  npc: NPC;
}

/** チュートリアルイベントの実装 */
class SimpleTutorialEvent extends EmptyCustomBattleEvent implements TutorialEvent {
  player: Player;
  npc: NPC;
  stateHistory: GameState[];

  /**
   * コンストラクタ
   */
  constructor() {
    super();
    const armdozer = ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) ?? ArmDozers[0];
    const pilot = Pilots.find(v => v.id === PilotIds.SHINYA)  ?? Pilots[0];
    this.player = {playerId: playerUuid(), armdozer, pilot};
    this.npc = oneBatteryWeakWingDozerNPC();
    this.stateHistory = [];
  }

  /** @override */
  async beforeLastState(props: LastState): Promise<void> {
    this.stateHistory = [...this.stateHistory, ...props.update];
    const turn = turnCount(this.stateHistory);
    const gameEnd = props.update.find(v => v.effect.name === 'GameEnd');
    const hasGameEnd = gameEnd && gameEnd.effect.name === 'GameEnd';
    if (hasGameEnd) {
      return;
    }
    
    const lastBattle = props.update.find(v => v.effect.name === 'Battle');
    const {hasBattle, isAttacker, lastBattleResult} = lastBattle && lastBattle.effect.name === 'Battle'
      ? {hasBattle: true, isAttacker: lastBattle.effect.attacker === this.player.playerId, lastBattleResult: lastBattle.effect.result}
      : {hasBattle: false, isAttacker: false, lastBattleResult: null};
    const lastBattleEffect = (lastBattle && lastBattle.effect.name === 'Battle') ? lastBattle.effect : null;
    if (turn === 1) {
      await introduction(props);
    } else if (turn === 2 && hasBattle && lastBattleResult) {
      await playerAttack(props, lastBattleResult);
      await refreshConversation(props);
      await batteryRuleDescription(props);
    } else if (hasBattle && isAttacker && lastBattleResult) {
      await playerAttack(props, lastBattleResult);
    } else if (hasBattle && !isAttacker && lastBattleResult) {
      await enemyAttack(props, lastBattleResult);
    }
  }

  /** @override */
  async onLastState(props: LastState): Promise<void> {
    const lastState = props.update[props.update.length - 1];
    const {hasLastState, isLastStateInputCommand, isLastStateMyTurn} = lastState
      ? {hasLastState: true, isLastStateInputCommand: lastState.effect.name === 'InputCommand', isLastStateMyTurn: lastState.activePlayerId === this.player.playerId}
      : {hasLastState: false, isLastStateInputCommand: false, isLastStateMyTurn: false};
    const gameEnd = props.update.find(v => v.effect.name === 'GameEnd');
    const {hasGameEnd, isVictory} = (gameEnd && gameEnd.effect.name === 'GameEnd')
      ? {hasGameEnd: true, isVictory: gameEnd.effect.result.type === 'GameOver' && gameEnd.effect.result.winner === this.player.playerId}
      : {hasGameEnd: false, isVictory: false};
    if (hasGameEnd && isVictory) {
      await victory(props);
      await refreshConversation(props);
      await tutorialEnd(props);
      invisibleAllMessageWindows(props);
    } else if (hasGameEnd && !isVictory) {
      await lose(props);
      await refreshConversation(props);
      await tutorialEnd(props);
      invisibleAllMessageWindows(props);
    } else if (hasLastState && isLastStateInputCommand && isLastStateMyTurn) {
      await attackBatterySelect(props);
    } else if (hasLastState && isLastStateInputCommand && !isLastStateMyTurn) {
      await defenseBatterySelect(props);
    }
  }

  /** @override */
  async onBatteryCommandSelected(props: BatteryCommandSelected): Promise<CommandCanceled> {
    const progressGame = async (): Promise<CommandCanceled> => {
      props.view.dom.leftMessageWindow.visible(false);
      props.view.hud.gameObjects.frontmostFader.opacity(0, 200).play();
      return {isCommandCanceled: false};
    };
    return await progressGame();
  }

  /** @override */
  async onBurstCommandSelected(): Promise<CommandCanceled> {
    return {isCommandCanceled: true};
  }

  /** @override */
  async onPilotSkillCommandSelected(): Promise<CommandCanceled> {
    return {isCommandCanceled: true};
  }
}

/**
 * チュートリアルイベントを生成する
 *
 * @return チュートリアルイベント
 */
export function createTutorialEvent(): TutorialEvent {
  return new SimpleTutorialEvent();
}