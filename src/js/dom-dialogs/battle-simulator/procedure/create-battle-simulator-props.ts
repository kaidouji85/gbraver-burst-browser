import { PlayerState } from "gbraver-burst-core";

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
  /** プレイヤーのステート */
  player: PlayerState;
  /** 敵のステート */
  enemy: PlayerState;
  /** プレイヤーが攻撃側か否か、trueで攻撃側 */
  isPlayerAttacker: boolean;
};

/**
 * プレイヤーのHTML要素を生成する
 * @param root ルート要素
 * @returns 生成結果
 */
const createPlayerElements = (root: HTMLElement) => ({
  damage: extractPlayerDamage(root),
  hp: extractPlayerHP(root),
  batteryValue: extractPlayerBatteryValue(root),
  batteryCorrect: extractPlayerBatteryCorrect(root),
  batteryPlus: extractPlayerBatteryPlus(root),
  batteryMinus: extractPlayerBatteryMinus(root),
});

/**
 * 敵のHTML要素を生成する
 * @param root ルート要素
 * @returns 生成結果
 */
const createEnemyElements = (root: HTMLElement) => ({
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
  const { player, enemy } = params;

  const root = document.createElement("div");
  root.className = ROOT;
  root.innerHTML = rootInnerHTML(params);

  const playerElements = createPlayerElements(root);
  const enemyElements = createEnemyElements(root);

  const playerBattery = player.armdozer.battery;
  const enemyBattery = enemy.armdozer.battery;
  return {
    ...params,

    root,
    playerElements,
    enemyElements,

    playerBattery,
    enemyBattery,
  };
}
