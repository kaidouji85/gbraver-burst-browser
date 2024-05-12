import { BattleSimulatorProps } from "../props";

/**
 * 戦闘シミュレータのプロパティを生成する
 * @returns 生成結果
 */
export function createBattleSimulatorProps(): BattleSimulatorProps {
  const root = document.createElement("div");
  root.innerText = "戦闘シミュレーター";
  return { root };
}
