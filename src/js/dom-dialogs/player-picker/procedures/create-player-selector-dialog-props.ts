import { ROOT } from "../dom/class-name";
import { rootInnerHTML } from "../dom/root-inner-html";
import { PlayerPickerDialogProps } from "../props";

/**
 * PlayerPickerDialogPropsを生成する
 * @returns 生成結果
 */
export const createPlayerPickerDialogProps = (): PlayerPickerDialogProps => {
  const root = document.createElement("div");
  root.className = ROOT;
  root.innerHTML = rootInnerHTML();

  return { root };
};
