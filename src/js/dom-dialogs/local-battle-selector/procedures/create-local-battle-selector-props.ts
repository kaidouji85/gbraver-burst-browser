import { rootInnerHTML } from "../dom/root-inner-html";
import { LocalBattleSelectorProps } from "../props";

/**
 * ローカル対戦セレクターダイアログのプロパティを作成する
 * @returns 作成したプロパティ
 */
export const createLocalBattleSelectorProps = (): LocalBattleSelectorProps => {
  const root = document.createElement("div");
  root.innerHTML = rootInnerHTML();
  return { root };
};
