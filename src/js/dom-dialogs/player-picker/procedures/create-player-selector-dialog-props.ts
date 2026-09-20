import { PlayerPickerDialogProps } from "../props";

/**
 * PlayerPickerDialogPropsを生成する
 * @returns 生成結果
 */
export const createPlayerPickerDialogProps = (): PlayerPickerDialogProps => {
  const root = document.createElement("div");
  return { root };
};
