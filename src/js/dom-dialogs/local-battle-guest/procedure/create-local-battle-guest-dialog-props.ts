import { ROOT_CLASS } from "../dom/class-name";
import { rootInnerHTML } from "../dom/root-inner-html";
import { LocalBattleGuestDialogProps } from "../props";

/**
 * ダイアログのプロパティを生成する
 * @returns 生成したプロパティ
 */
export const createLocalBattleGuestDialogProps =
  (): LocalBattleGuestDialogProps => {
    const root = document.createElement("div");
    root.className = ROOT_CLASS;
    root.innerHTML = rootInnerHTML();

    return { root };
  };
