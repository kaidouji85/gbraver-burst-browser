import { ResourcesContainer } from "../../../resource";
import { ROOT } from "../dom/class-name";
import { rootInnerHTML } from "../dom/root-inner-html";
import { BattleSimulatorProps } from "../props";

/** 生成パラメータ */
export type BattleSimulatorPropsCreatorParams = ResourcesContainer;

/**
 * 戦闘シミュレータのプロパティを生成する
 * @returns 生成結果
 */
export function createBattleSimulatorProps(
  params: BattleSimulatorPropsCreatorParams,
): BattleSimulatorProps {
  const root = document.createElement("div");
  root.className = ROOT;
  root.innerHTML = rootInnerHTML(params);
  return { root };
}
