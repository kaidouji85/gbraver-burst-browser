import { ROOT_CLASS } from "../dom/class-name";
import { rootInnerHTML, RootInnerHTMLOptions } from "../dom/root-inner-html";

/** ローカル対戦ホストダイアログのプロパティ生成オプション */
export type CreateLocalBattleHostDialogPropsOptions = RootInnerHTMLOptions;

/**
 * ローカル対戦ホストダイアログのプロパティを生成する
 * @param options 生成オプション
 * @returns 生成されたプロパティ
 */
export const createLocalBattleHostDialogProps = (
  options: CreateLocalBattleHostDialogPropsOptions,
) => {
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHTML(options);

  return {
    root,
  };
};
