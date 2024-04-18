import { PredicatedDamageProps } from "../props";

/**
 * PredicatedDamagePropsを生成する
 * @return 生成結果
 */
export function createPredicatedDamageProps(): PredicatedDamageProps {
  const root = document.createElement("div");
  root.innerText = "ダメージ予想";
  return {
    root,
  };
}
