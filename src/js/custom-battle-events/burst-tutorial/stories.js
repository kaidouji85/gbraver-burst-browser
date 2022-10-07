// @flow
import type {BattleResult} from "gbraver-burst-core";
import type {CustomBattleEventProps} from "../../game/td-scenes/battle/custom-battle-event";
import {activeLeftMessageWindowWithFace, activeRightMessageWindowWithFace} from "../active-message-window";
import {invisibleAllMessageWindows, refreshConversation} from "../invisible-all-message-windows";
import {scrollLeftMessages, scrollRightMessages} from "../scroll-messages";

/**
 * ストーリー 冒頭
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export const introduction = async (props: CustomBattleEventProps) => {
  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  await scrollLeftMessages(props, [
    ['ツバサ', '「これより 操縦訓練を開始する'],
    ['姿勢を正して 礼!!」']
  ]);
  await refreshConversation(props);

  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  props.view.dom.leftMessageWindow.messages(
    ['ツバサ', '「よろしくお願いします」']
  );
  props.view.dom.leftMessageWindow.scrollUp();
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「よろしくお願いします」']
  ]);
  await refreshConversation(props, 100);

  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  await scrollLeftMessages(props, [
    ['ツバサ', '「いい返事だな では早速はじめよう'],
    ['試合の基本は攻撃側 防御側でのバッテリーの出し合いだ'],
    ['大きいバッテリーを出した側の行動が成功するのだが これは実際にやってみた方が早いな'],
    ['シンヤ 私が防御に回るから 好きなように攻撃してくれ」']
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「了解ッス'],
    ['それじゃ遠慮なく行くッスよ ツバサ先輩」'],
  ]);
  props.view.dom.rightMessageWindow.darken();
};
/**
 * ストーリー プレイヤー攻撃ヒット
 * @param props イベントプロパティ
 * @return  ストーリーが完了したら発火するPromise
 */
export const playerAttackHit = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「手応えありッス」']
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
export const playerAttackGuarded = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「よし 攻撃ヒット」']
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
export const playerAttackMiss = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「しまった 避けられた」']
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
export const playerAttack = async (props: CustomBattleEventProps, battleResult: BattleResult) => {
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
export const batteryRuleDescription = async (props: CustomBattleEventProps) => {
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
export const enemyAttackMiss = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「よし 回避成功ッス」']
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
export const enemyAttackGuarded = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「クッ 避けられなかった'],
    ['けど思った程のダメージじゃないッスね」',],
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  await scrollLeftMessages(props, [
    ['ツバサ', '「私の攻撃をガードするとはな'],
    ['私と君が同じバッテリーを出したので攻撃をガード ダメージが半減されたな」'],
  ]);
  props.view.dom.leftMessageWindow.darken();
};
/**
 * ストーリー 敵攻撃ヒット
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export const enemyAttackHit = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「すごいダメージ ッス'],
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
export const enemyAttack = async (props: CustomBattleEventProps, battleResult: BattleResult) => {
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
export const completeAttackAndDefense = async (props: CustomBattleEventProps) => {
  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  await scrollLeftMessages(props, [
    ['ツバサ', '「これで攻撃 防御を一通り体験したな'],
    ['以降はどちらかのHPが0になるまで これを繰り返すんだ'],
    ['以上で基本ルールは完了だ ここから先は好きなように戦ってくれ」'],
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
export const noZeroBatteryDefense = async (props: CustomBattleEventProps) => {
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
export const cancelZeroBatteryDefense = async (props: CustomBattleEventProps) => {
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
export const doBurstBecauseZeroBattery = async (props: CustomBattleEventProps) => {
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
export const doPilotSkillBecauseZeroBattery = async (props: CustomBattleEventProps) => {
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
    ['シンヤ', '「了解ッス 俺の底力 見せてやる!!」'],
  ]);
  props.view.dom.rightMessageWindow.darken();
};
/**
 * ストーリー バースト、パイロットスキルが使えず0バッテリーなので負け確定
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export const zeroBatteryDefenseBecauseNoBatteryRecover = async (props: CustomBattleEventProps) => {
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
    ['ならば 最後のパイロットスキル'],
    ['……も既に使い果たしたか'],
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「センパーイ」']
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  await scrollLeftMessages(props, [
    ['ツバサ', '「残念ながら万策尽きたな'],
    ['初めての訓練では良くあることだから あまり気にするな'],
  ]);
  props.view.dom.leftMessageWindow.darken();
};
/**
 * ストーリー プレイヤーの勝利
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export const victory = async (props: CustomBattleEventProps) => {
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
};
/**
 * ストーリー プレイヤーの敗北
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export const lose = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「あともう少しで勝てたのに」']
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
export const tutorialEnd = async (props: CustomBattleEventProps) => {
  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  await scrollLeftMessages(props, [
    ['ツバサ', '「これにて操縦訓練を終了する'],
    ['姿勢を正して 礼!!」」']
  ]);
  await refreshConversation(props);

  activeLeftMessageWindowWithFace(props, 'Tsubasa');
  props.view.dom.leftMessageWindow.messages(
    ['ツバサ', '「ありがとうございました」']
  );
  props.view.dom.leftMessageWindow.scrollUp();
  activeRightMessageWindowWithFace(props, 'Shinya');
  await scrollRightMessages(props, [
    ['シンヤ', '「ありがとうございました」']
  ]);
  invisibleAllMessageWindows(props);
};