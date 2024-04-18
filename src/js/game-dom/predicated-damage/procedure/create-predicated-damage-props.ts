import { ROOT } from "../dom/class-name";
import { rootInnerHTML } from "../dom/root-inner-html";
import { PredicatedDamageProps } from "../props";

/**
 * PredicatedDamagePropsを生成する
 * @return 生成結果
 */
export function createPredicatedDamageProps(): PredicatedDamageProps {
  const root = document.createElement("div");
  root.className = ROOT;
  root.innerHTML = rootInnerHTML();
  return { root };
}
