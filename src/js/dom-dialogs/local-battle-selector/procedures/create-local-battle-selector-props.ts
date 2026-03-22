import { Exclusive } from "../../../exclusive/exclusive";
import { ROOT_CLASS } from "../dom/class-name";
import { rootInnerHTML, RootInnerHTMLOptions } from "../dom/root-inner-html";
import { LocalBattleSelectorDialogProps } from "../props";
import { extractLocalBattleHost } from "./extract-element";

/** ローカル対戦セレクターダイアログのプロパティ作成オプション */
export type CreateLocalBattleSelectorPropsOptions = RootInnerHTMLOptions;

/**
 * ローカル対戦セレクターダイアログのプロパティを作成する
 * @param options 作成オプション
 * @returns 作成したプロパティ
 */
export const createLocalBattleSelectorProps = (
  options: CreateLocalBattleSelectorPropsOptions,
): LocalBattleSelectorDialogProps => {
  const root = document.createElement("div");
  root.innerHTML = rootInnerHTML(options);
  root.className = ROOT_CLASS;

  const localBattleHostButton = extractLocalBattleHost(root);

  const exclusive = new Exclusive();

  return { root, localBattleHostButton, exclusive };
};
