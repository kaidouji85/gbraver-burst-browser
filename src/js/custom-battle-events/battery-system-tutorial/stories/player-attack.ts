import type { BattleResult } from "gbraver-burst-core";

import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";

/**
 * ストーリー プレイヤー攻撃ヒット
 *
 * @param props イベントプロパティ
 * @returns  ストーリーが完了したら発火するPromise
 */
export async function playerAttackHit(props: CustomBattleEventProps) {
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「手応えありッス」"]]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「見事な攻撃だな シンヤ"],
    ["君が私よりも大きいバッテリーを出したので 攻撃がヒットしたぞ」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
}

/**
 * ストーリー プレイヤー攻撃ガード
 *
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function playerAttackGuarded(props: CustomBattleEventProps) {
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「よし 攻撃ヒット」"]]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「甘いぞ シンヤ"],
    ["君は私と同じバッテリーを出したので攻撃をガード"],
    ["ダメージを半減させてもらった」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
}

/**
 * ストーリー プレイヤー攻撃ミス
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function playerAttackMiss(props: CustomBattleEventProps) {
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「しまった 避けられた」"]]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「まだまだ だな シンヤ"],
    ["私の方が君より大きいバッテリーを出したので"],
    ["攻撃を回避させてもらった」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
}

/**
 * プレイヤー攻撃の結果に応じてストーリーを分岐する
 *
 * @param props イベントプロパティ
 * @param battleResult 戦闘結果
 * @returns ストーリーが完了したら発火するPromise
 */
export async function playerAttack(
  props: CustomBattleEventProps,
  battleResult: BattleResult,
) {
  if (
    battleResult.name === "NormalHit" ||
    battleResult.name === "CriticalHit"
  ) {
    await playerAttackHit(props);
  } else if (battleResult.name === "Guard") {
    await playerAttackGuarded(props);
  } else if (battleResult.name === "Miss" || battleResult.name === "Feint") {
    await playerAttackMiss(props);
  }
}
