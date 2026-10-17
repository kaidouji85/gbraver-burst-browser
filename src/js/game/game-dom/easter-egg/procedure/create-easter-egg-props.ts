import { ROOT_CLASS } from "../dom/class-name";
import { rootInnerHTML } from "../dom/root-inner-html";
import { EasterEggProps } from "../props";

/**
 * EasterEggPropsを生成する
 * @returns 生成されたEasterEggProps
 */
export const createEasterEggProps = (): EasterEggProps => {
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHTML();
  return {
    root,
  };
};
