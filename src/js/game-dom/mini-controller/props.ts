import { ROOT } from "./dom/class-name";
import { rootInnerHTML } from "./dom/root-inner-html";

/** ミニコントローラープロパティ */
export type MiniControllerProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
};

/**
 * ミニコントローラープロパティを生成する
 * @return 生成結果
 */
export function createMiniControllerProps(): MiniControllerProps {
  const root = document.createElement("div");
  root.className = ROOT;
  root.innerHTML = rootInnerHTML();
  return { root };
}
