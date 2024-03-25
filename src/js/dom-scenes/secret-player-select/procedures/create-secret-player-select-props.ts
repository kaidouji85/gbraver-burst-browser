import { ROOT } from "../dom/class-name";
import { rootInnerHTML } from "../dom/root-inner-html";
import { SecretPlayerSelectProps } from "../props";

/**
 * SecretPlayerSelectPropsを生成する
 * @return 生成結果
 */
export function createSecretPlayerSelectProps(): SecretPlayerSelectProps {
  const root = document.createElement("div");
  root.className = ROOT;
  root.innerHTML = rootInnerHTML();
  return { root };
}
