// @flow
import type {CustomBattleEventProps} from "../../game/td-scenes/battle/custom-battle-event";
import {activeLeftMessageWindowWithFace, activeRightMessageWindowWithFace} from "../active-message-window";
import {scrollLeftMessages, scrollRightMessages} from "../scroll-messages";

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

