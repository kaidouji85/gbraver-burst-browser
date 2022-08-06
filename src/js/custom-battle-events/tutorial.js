// @flow
import type {BattleResult, GameState, Player, PlayerId} from "gbraver-burst-core";
import {ArmDozerIdList, ArmDozers, PilotIds, Pilots} from "gbraver-burst-core";
import type {
  BatteryCommandSelected,
  BattleSceneProps, BurstCommandSelected,
  CommandCanceled,
  CustomBattleEvent,
  LastState,
} from "../game/td-scenes/battle/custom-battle-event";
import type {NPC} from "../npc/npc";
import {oneBatteryWeakWingDozerNPC} from "../npc/one-battery";
import {waitTime} from "../wait/wait-time";
import {
  activeLeftMessageWindow,
  activeLeftMessageWindowWithFace, activeRightMessageWindow,
  activeRightMessageWindowWithFace
} from "./active-message-window";
import {
  attentionBatterySelector,
  attentionBurstButton,
  unattentionBatterySelector,
  unattentionBurstButton
} from "./attention";
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
    ['シンヤ', '「よろしくお願いしますッス」']
  ]);
  props.view.dom.rightMessageWindow.darken();

  props.view.dom.leftMessageWindow.lighten();
  await scrollLeftMessages(props, [
    ['ツバサ', '「いい返事だな では早速はじめよう'],
    ['試合の基本は 攻撃側 防御側でバッテリーを出し合うことだ'],
    ['大きいバッテリーを出した側の行動が成功するのだが これは実際にやってみた方が早いな'],
    ['シンヤ 私が防御に回るから 好きなように攻撃してくれ」']
  ]);
  props.view.dom.leftMessageWindow.darken();

  props.view.dom.rightMessageWindow.lighten();
  await scrollRightMessages(props, [
    ['シンヤ', '「了解ッス'],
    ['それじゃ遠慮なくいきますよ ツバサ先輩」'],
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
    ['ツバサ', '「見事な攻撃だな シンヤ'],
    ['君が私よりも大きいバッテリーを出したので 攻撃がヒットしたぞ」'],
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
    ['ツバサ', '「甘いぞ シンヤ'],
    ['君は私と同じバッテリーを出したので 攻撃をガード ダメージを半減させてもらった」'],
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
    ['ツバサ', '「まだまだ だな シンヤ'],
    ['私の方が君より大きいバッテリーを出したので 攻撃を回避させてもらった」'],
  ]);
  props.view.dom.leftMessageWindow.darken();
};

/**
 * プレイヤー攻撃の結果に応じてストーリーを分岐する
 * @param props イベントプロパティ
 * @param battleResult 戦闘結果
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
    ['シンヤ', '「なるほど シンプルながらも奥が深いッスね」']
  ]);
  props.view.dom.rightMessageWindow.darken();

  props.view.dom.leftMessageWindow.lighten();
  await scrollLeftMessages(props, [
    ['ツバサ', '「バッテリーの攻防配分 これが基本かつ奥義だ'],
    ['では 次は私が攻撃を仕掛けるので 同じ要領で回避してくれ」'],
  ]);
  props.view.dom.leftMessageWindow.darken();

  props.view.dom.rightMessageWindow.lighten();
  await scrollRightMessages(props, [
    ['シンヤ', '「了解ッス'],
    ['お手柔らかに頼むッスよ ツバサ先輩'],
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
    ['私よりも君の方が大きいバッテリーを出したので　攻撃を完全回避したぞ」'],
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
    ['私と君が同じバッテリーを出したので 攻撃をガード ダメージが半減されたな」'],
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
    ['ツバサ先輩 少しは加減してくださいッスよ']
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  await scrollLeftMessages(props, [
    ['ツバサ', '「すまない これでも手心を加えたつもりなのだがな'],
    ['私の方が君よりも大きいバッテリーを出したので 攻撃を当てさせてもらった」'],
  ]);
  props.view.dom.leftMessageWindow.darken();
};

/**
 * 敵攻撃の結果に応じてストーリーを分岐する
 * @param props イベントプロパティ
 * @param battleResult 戦闘結果
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
 * ストーリー 攻撃、防御を一通り体験した
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const completeAttackAndDefense = async (props: BattleSceneProps) => {
  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  await scrollLeftMessages(props, [
    ['ツバサ', '「これで攻撃 防御を一通り体験したな'],
    ['以降はどちらかのHPが0になるまで これを繰り返し行うんだ'],
    ['以上で基本ルールは完了だ', 'ここから先は君の好きに戦ってくれ」']
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「了解ッス'],
    ['勝負はこれからッスよ ツバサ先輩」']
  ]);
  props.view.dom.rightMessageWindow.darken();
};

/**
 * ストーリー 0防御は即死
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const noZeroBatteryDefense = async (props: BattleSceneProps) => {
  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  await scrollLeftMessages(props, [
    ['ツバサ', '「待て シンヤ!! 0防御はまずい」'],
    ['たとえHPが満タンでも即死級のダメージを受けるぞ」']
  ]);
  props.view.dom.leftMessageWindow.darken();
};

/**
 * ストーリー 0防御なのでコマンドキャンセル
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const cancelZeroBatteryDefense = async (props: BattleSceneProps) => {
  await noZeroBatteryDefense(props);

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「えっ それはマズイッスね'],
    ['今のは無かったことにして欲しいッス」']
  ]);
  props.view.dom.rightMessageWindow.darken();
};

/**
 * ストーリー 0防御0バッテリーなのでバーストする
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const doBurstBecauseZeroBattery = async (props: BattleSceneProps) => {
  await noZeroBatteryDefense(props);

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「でもツバサ先輩 俺のバッテリーはもう0ッスよ'],
    ['俺はこのまま即死ッスか」']

  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  await scrollLeftMessages(props, [
    ['ツバサ', '「心配するな シンヤ こういう時はバーストだ'],
    ['バーストは1試合に1回しか使えないが 発動すればバッテリーを大幅に回復できるんだ」'],
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「了解ッス バーストで立て直せばいいんすね」'],
  ]);
  props.view.dom.rightMessageWindow.darken();
};

/**
 * ストーリー 0防御0バッテリーなのでパイロットスキルを使う
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const doPilotSkillBecauseZeroBattery = async (props: BattleSceneProps) => {
  await noZeroBatteryDefense(props);

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「でもツバサ先輩 俺のバッテリーはもう0ッスよ'],
    ['俺はこのまま即死ッスか」']
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  await scrollLeftMessages(props, [
    ['ツバサ', '「こういう時はバーストでバッテリーを回復するんだ'],
    ['……と言いたいところが もうバーストは使ってしまったか'],
    ['ならば 最後の手段だ シンヤ 君に秘めれた力を発動するんだ」'],
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「俺に秘められた力?」'],
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  await scrollLeftMessages(props, [
    ['ツバサ', '「パイロットスキルを発動するんだ'],
    ['君のパイロットスキルはバッテリーを少しだけ回復することができる'],
    ['これで急場を凌ぐんだ」'],
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「了解ッス、俺の底力を見せてやる!!」'],
  ]);
  props.view.dom.rightMessageWindow.darken();
}

/**
 * ストーリー プレイヤーの勝利
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
const victory = async (props: BattleSceneProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「俺の勝ちッスよ ツバサ先輩」']
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  await scrollLeftMessages(props, [
    ['ツバサ', '「見事だ シンヤ'],
    ['この調子で精進を積んでくれ」']
  ]);
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
    ['シンヤ', '「ありがとうございましたッス」']
  ]);
  props.view.dom.rightMessageWindow.darken();
};

/**
 * プレイヤー攻撃時にバッテリーセレクタにフォーカスインする
 * @param props イベントプロパティ
 * @return 処理が完了したら発火するPromise
 */
const focusInAttackBatterySelector = async (props: BattleSceneProps) => {
  attentionBatterySelector(props);
  invisibleAllMessageWindows(props);
  activeLeftMessageWindow(props);
  props.view.dom.leftMessageWindow.messages([
    '好きなバッテリーで 攻撃してみよう',
    'ツバサ先輩よりも 大きい数字を出せば 攻撃が当たるぞ'
  ]);
  await props.view.hud.gameObjects.frontmostFader.opacity(0.7, 200).play();
};

/**
 * プレイヤー防御時にバッテリーセレクタにフォーカスインする
 * @param props イベントプロパティ
 * @return 処理が完了したら発火するPromise
 */
const focusInDefenseBatterySelector = async (props: BattleSceneProps) => {
  attentionBatterySelector(props);
  invisibleAllMessageWindows(props);
  activeLeftMessageWindow(props);
  props.view.dom.leftMessageWindow.messages([
    '好きなバッテリーで 防御してみよう',
    'ツバサ先輩よりも 大きい数字を出せば 完全回避できるぞ'
  ]);
  await props.view.hud.gameObjects.frontmostFader.opacity(0.7, 200).play();
};

/**
 * バッテリーセレクタからフォーカスアウトする
 * @param props イベントプロパティ
 * @return 処理が完了したら発火するPromise
 */
const focusOutBatterySelector = async (props: BattleSceneProps) => {
  props.view.dom.leftMessageWindow.visible(false);
  await props.view.hud.gameObjects.frontmostFader.opacity(0, 200).play();
  unattentionBatterySelector(props);
};

/**
 * バーストボタンにフォーカスインする
 * @param props イベントプロパティ
 * @return 処理が完了したら発火するPromise
 */
const focusInBurstButton = async (props: BattleSceneProps) => {
  attentionBurstButton(props);
  invisibleAllMessageWindows(props);
  activeRightMessageWindow(props);
  props.view.dom.rightMessageWindow.messages([
    'このまま0防御すると負け確定だ',
    'バーストでバッテリーを回復させよう'
  ]);
  await props.view.hud.gameObjects.frontmostFader.opacity(0.7, 200).play();
}

/**
 * バーストボタンからフォーカスアウトする
 * @param props イベントプロパティ
 * @return 処理が完了したら発火するPromise
 */
const focusOutBurstButton = async (props: BattleSceneProps) => {
  props.view.dom.rightMessageWindow.visible(false);
  await props.view.hud.gameObjects.frontmostFader.opacity(0, 200).play();
  unattentionBurstButton(props);
}

/** 選択可能なコマンド */
type SelectableCommands = 'BatteryOnly' | 'BurstOnly' | 'All';

/** チュートリアルイベント */
export interface TutorialEvent extends CustomBattleEvent {
  /** プレイヤー情報 */
  player: Player;
  /** NPC */
  npc: NPC;
}

/** チュートリアルイベントの実装 */
class SimpleTutorialEvent extends EmptyCustomBattleEvent implements TutorialEvent {
  /** @override */
  player: Player;
  /** @override */
  npc: NPC;
  /** ステートヒストリー、 beforeLastState開始時に更新される */
  stateHistory: GameState[];
  /** 選択可能なコマンド、onLastStateで本プロパティの設定内容に応じてコマンド入力制限を行う */
  selectableCommands: SelectableCommands;

  /**
   * コンストラクタ
   *
   * @param playerId プレイヤーID
   */
  constructor(playerId: PlayerId) {
    super();
    const armdozer = ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) ?? ArmDozers[0];
    const pilot = Pilots.find(v => v.id === PilotIds.SHINYA)  ?? Pilots[0];
    this.player = {playerId, armdozer, pilot};
    this.npc = oneBatteryWeakWingDozerNPC();
    this.stateHistory = [];
    this.selectableCommands = 'BatteryOnly';
  }

  /** @override */
  async beforeLastState(props: LastState): Promise<void> {
    this.stateHistory = [...this.stateHistory, ...props.update];
    const hasGameEnd = props.update.find(v => v.effect.name === 'GameEnd') !== undefined;
    if (hasGameEnd) {
      return;
    }
    
    const turn = turnCount(this.stateHistory);
    const foundLastBattle = props.update.find(v => v.effect.name === 'Battle');
    const lastBattle = foundLastBattle && foundLastBattle.effect.name === 'Battle'
      ? {isAttacker: foundLastBattle.effect.attacker === this.player.playerId, result: foundLastBattle.effect.result}
      : null;
    if (turn === 1) {
      await introduction(props);
    } else if (turn === 2 && lastBattle) {
      await playerAttack(props, lastBattle.result);
      await refreshConversation(props);
      await batteryRuleDescription(props);
    } else if (turn === 3 && lastBattle) {
      this.selectableCommands = 'All';
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
      ? {isInputCommand: foundLastState.effect.name === 'InputCommand', isMyTurn: foundLastState.activePlayerId === this.player.playerId}
      : null;
    if (this.selectableCommands === 'BatteryOnly' && lastState && lastState.isInputCommand && lastState.isMyTurn) {
      await focusInAttackBatterySelector(props);
    } else if (this.selectableCommands === 'BatteryOnly' && lastState && lastState.isInputCommand && !lastState.isMyTurn) {
      await focusInDefenseBatterySelector(props);
    }
  }

  /** @override */
  async afterLastState(props: LastState): Promise<void> {
    const foundGameEnd = props.update.find(v => v.effect.name === 'GameEnd');
    const gameEnd = (foundGameEnd && foundGameEnd.effect.name === 'GameEnd')
      ? {isVictory: foundGameEnd.effect.result.type === 'GameOver' && foundGameEnd.effect.result.winner === this.player.playerId}
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
      ? {isEnemyTurn: foundLastState.activePlayerId !== this.player.playerId,
        player: foundLastState.players.find(v => v.playerId === this.player.playerId)}
      : null;
    const lastPlayer = (lastState && lastState.player)
      ? {isZeroBattery: lastState.player.armdozer.battery === 0,
        enableBurst: lastState.player.armdozer.enableBurst, enablePilotSkill: lastState.player.pilot.enableSkill}
      : null
    const isZeroBatteryCommand = props.battery.battery === 0;
    if (lastState && lastPlayer && isZeroBatteryCommand && lastState.isEnemyTurn && lastPlayer.isZeroBattery && lastPlayer.enableBurst) {
      await doBurstBecauseZeroBattery(props);
      refreshConversation(props);
      this.selectableCommands = 'BurstOnly';
      unattentionBurstButton(props);
      await focusInBurstButton(props);
      return {isCommandCanceled: true};
    } else if (lastState && isZeroBatteryCommand && lastState.isEnemyTurn) {
      await cancelZeroBatteryDefense(props);
      refreshConversation(props);
      (this.selectableCommands === 'BatteryOnly') && await focusInDefenseBatterySelector(props);
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
      this.selectableCommands = 'All';
      focusOutBurstButton(props);
    }

    return {isCommandCanceled: false};
  }

  /** @override */
  async onPilotSkillCommandSelected(): Promise<CommandCanceled> {
    const enablePilotSkillCommand: SelectableCommands[] = ['All'];
    if (!enablePilotSkillCommand.includes(this.selectableCommands)) {
      return {isCommandCanceled: true};
    }

    return {isCommandCanceled: false};
  }
}

/**
 * チュートリアルイベントを生成する
 *
 * @param playerId プレイヤーID
 * @return チュートリアルイベント
 */
export function createTutorialEvent(playerId: PlayerId): TutorialEvent {
  return new SimpleTutorialEvent(playerId);
}