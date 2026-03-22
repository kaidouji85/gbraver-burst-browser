import { ROOT_CLASS } from "../dom/class-name";
import { rootInnerHTML } from "../dom/root-inner-html";

/**
 * ローカル対戦ホストダイアログのプロパティを生成する
 * @returns 生成されたプロパティ
 */
export const createLocalBattleHostDialogProps = () => {
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHTML();

  return {
    root,
  };
};
