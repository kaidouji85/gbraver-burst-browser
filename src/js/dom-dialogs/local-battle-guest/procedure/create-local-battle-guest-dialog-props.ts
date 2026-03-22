import { ROOT_CLASS } from "../dom/class-name";
import { rootInnerHTML, RootInnerHTMLOptions } from "../dom/root-inner-html";
import { LocalBattleGuestDialogProps } from "../props";

/** ダイアログのプロパティを生成するオプション */
export type CreateLocalBattleGuestDialogPropsOptions = RootInnerHTMLOptions;

/**
 * ダイアログのプロパティを生成する
 * @returns 生成したプロパティ
 */
export const createLocalBattleGuestDialogProps = (
  options: CreateLocalBattleGuestDialogPropsOptions,
): LocalBattleGuestDialogProps => {
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHTML(options);

  return { root };
};
