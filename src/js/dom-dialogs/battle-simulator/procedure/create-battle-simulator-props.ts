import { PlayerState } from "gbraver-burst-core";

import { ResourcesContainer } from "../../../resource";
import { ROOT } from "../dom/class-name";
import {
  createEnemyElements,
  createPlayerElements,
} from "../dom/player-elements";
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
