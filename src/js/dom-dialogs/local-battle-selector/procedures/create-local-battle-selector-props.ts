import { ROOT_CLASS } from "../dom/class-name";
import { rootInnerHTML, RootInnerHTMLOptions } from "../dom/root-inner-html";
import { LocalBattleSelectorProps } from "../props";

/** ローカル対戦セレクターダイアログのプロパティ作成オプション */
export type CreateLocalBattleSelectorPropsOptions = RootInnerHTMLOptions;

/**
 * ローカル対戦セレクターダイアログのプロパティを作成する
 * @param options 作成オプション
 * @returns 作成したプロパティ
 */
export const createLocalBattleSelectorProps = (
  options: CreateLocalBattleSelectorPropsOptions,
): LocalBattleSelectorProps => {
  const root = document.createElement("div");
  root.innerHTML = rootInnerHTML(options);
  root.className = ROOT_CLASS;
  return { root };
};
