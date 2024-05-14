import { PlayerId, PlayerState } from "gbraver-burst-core";

import { ResourcesContainer } from "../../../resource";
import { ROOT } from "../dom/class-name";
import {
  extractEnemyBatteryCorrect,
  extractEnemyBatteryMinus,
  extractEnemyBatteryPlus,
  extractEnemyBatteryValue,
  extractEnemyDamage,
  extractEnemyHP,
  extractPlayerBatteryCorrect,
  extractPlayerBatteryMinus,
  extractPlayerBatteryPlus,
  extractPlayerBatteryValue,
  extractPlayerDamage,
  extractPlayerHP,
} from "../dom/extract-element";
import { rootInnerHTML } from "../dom/root-inner-html";
import { BattleSimulatorProps } from "../props";

/** 生成パラメータ */
export type BattleSimulatorPropsCreatorParams = ResourcesContainer & {
  /** ゲームに参加しているプレイヤーのステート */
  players: [PlayerState, PlayerState];
  /** 画面を開いているプレイヤーID */
  playerId: PlayerId;
  /** 攻撃側プレイヤーID */
  activePlayerId: PlayerId;
};

/**
 * プレイヤーのHTML要素を生成する
 * @param playerId プレイヤーID
 * @param root ルート要素
 * @returns 生成結果
 */
const createPlayerElements = (playerId: PlayerId, root: HTMLElement) => ({
  playerId,
  damage: extractPlayerDamage(root),
  hp: extractPlayerHP(root),
  batteryValue: extractPlayerBatteryValue(root),
  batteryCorrect: extractPlayerBatteryCorrect(root),
  batteryPlus: extractPlayerBatteryPlus(root),
  batteryMinus: extractPlayerBatteryMinus(root),
});

/**
 * 敵のHTML要素を生成する
 * @param playerId プレイヤーID
 * @param root ルート要素
 * @returns 生成結果
 */
const createEnemyElements = (playerId: PlayerId, root: HTMLElement) => ({
  playerId,
  damage: extractEnemyDamage(root),
  hp: extractEnemyHP(root),
  batteryValue: extractEnemyBatteryValue(root),
  batteryCorrect: extractEnemyBatteryCorrect(root),
  batteryPlus: extractEnemyBatteryPlus(root),
  batteryMinus: extractEnemyBatteryMinus(root),
});

/**
 * 戦闘シミュレータのプロパティを生成する
 * @returns 生成結果
 */
export function createBattleSimulatorProps(
  params: BattleSimulatorPropsCreatorParams,
): BattleSimulatorProps {
  const { players, playerId } = params;

  const root = document.createElement("div");
  root.className = ROOT;
  root.innerHTML = rootInnerHTML(params);

  const enemyId =
    players.find((p) => p.playerId !== params.playerId)?.playerId ?? "";
  return {
    ...params,
    root,
    playerElements: [
      createPlayerElements(playerId, root),
      createEnemyElements(enemyId, root),
    ],
  };
}
