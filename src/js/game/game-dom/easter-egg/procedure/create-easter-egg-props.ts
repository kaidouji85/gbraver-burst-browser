import { ROOT_CLASS_HIDDEN } from "../dom/class-name";
import { extractContent } from "../dom/extract-element";
import { rootInnerHTML } from "../dom/root-inner-html";
import { EasterEggProps } from "../props";

/**
 * EasterEggPropsを生成する
 * @returns 生成されたEasterEggProps
 */
export const createEasterEggProps = (): EasterEggProps => {
  const root = document.createElement("div");
  root.className = ROOT_CLASS_HIDDEN;
  root.innerHTML = rootInnerHTML();

  const content = extractContent(root);
  return {
    root,
    content,
  };
};
