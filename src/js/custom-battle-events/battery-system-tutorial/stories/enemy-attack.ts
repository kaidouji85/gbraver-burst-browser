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
    ["ツバサ", "「素晴らしい<wbr>マニューバだ<wbr> シンヤ"],
    [
      "私よりも<wbr>君の方が<wbr>大きいバッテリー<wbr>を出したので<wbr> 攻撃を回避したぞ」",
    ],
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
    ["シンヤ", "「クッ 避けられ<wbr>なかった"],
    ["けど思った程の<wbr>ダメージじゃないッスね」"],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    [
      "ツバサ",
      "「私と君が<wbr>同じバッテリー<wbr>を出したので<wbr> 攻撃をガード",
    ],
    ["ダメージが<wbr>半減されたぞ」"],
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
    ["ツバサ先輩<wbr> 少しは加減<wbr>してください<wbr>ッスよ"],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「すまない<wbr> これでも<wbr>手心を加えたのだがな"],
    [
      "私の方が君よりも<wbr>大きいバッテリー<wbr>を出したので<wbr> 攻撃がヒット<wbr>したぞ」",
    ],
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
