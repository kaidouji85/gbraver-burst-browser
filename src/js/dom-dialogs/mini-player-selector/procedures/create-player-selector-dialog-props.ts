import { PlayerSelectorDialogProps } from "../props";

/**
 * PlayerSelectorDialogPropsを生成する
 * @returns 生成結果
 */
export const createPlayerSelectorDialogProps =
  (): PlayerSelectorDialogProps => {
    const root = document.createElement("div");
    return { root };
  };
