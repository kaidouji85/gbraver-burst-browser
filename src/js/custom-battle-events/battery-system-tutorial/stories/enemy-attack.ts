import type { BattleResult } from "gbraver-burst-core";

import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";

/**
 * ストーリー 敵攻撃回避
 *
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function enemyAttackMiss(props: CustomBattleEventProps) {
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「よし 回避成功ッス」"]]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「素晴らしいマニューバだ シンヤ"],
    ["私よりも君の方が大きいバッテリーを出したので 攻撃を回避したぞ」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
}

/**
 * ストーリー 敵攻撃ガード
 *
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function enemyAttackGuarded(props: CustomBattleEventProps) {
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「クッ 避けられなかった"],
    ["けど思った程のダメージじゃないッスね」"],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「私と君が同じバッテリーを出したので 攻撃をガード"],
    ["ダメージが半減されたぞ」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
}

/**
 * ストーリー 敵攻撃ヒット
 *
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function enemyAttackHit(props: CustomBattleEventProps) {
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「すごいダメージ ッス"],
    ["ツバサ先輩 少しは加減してくださいッスよ"],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「すまない これでも手心を加えたのだがな"],
    ["私の方が君よりも大きいバッテリーを出したので 攻撃がヒットしたぞ」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
}

/**
 * 敵攻撃の結果に応じてストーリーを分岐する
 *
 * @param props イベントプロパティ
 * @param battleResult 戦闘結果
 * @returns ストーリーが完了したら発火するPromise
 */
export async function enemyAttack(
  props: CustomBattleEventProps,
  battleResult: BattleResult,
) {
  if (
    battleResult.name === "NormalHit" ||
    battleResult.name === "CriticalHit"
  ) {
    await enemyAttackHit(props);
  } else if (battleResult.name === "Guard") {
    await enemyAttackGuarded(props);
  } else if (battleResult.name === "Miss" || battleResult.name === "Feint") {
    await enemyAttackMiss(props);
  }
}
