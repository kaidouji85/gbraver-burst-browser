import { ArmdozerId } from "gbraver-burst-core";

import { ResourcesContainer } from "../../../resource";
import { armdozerIcon } from "../dom/armdozer-icon";
import { ROOT } from "../dom/class-name";
import { extractArmdozerPicker } from "../dom/extract-element";
import { rootInnerHTML } from "../dom/root-inner-html";
import { PlayerPickerDialogProps } from "../props";

/** プロパティの生成オプション */
export type CreatePlayerPickerDialogPropsOptions = ResourcesContainer & {
  /** ピッカーで選択可能なアームドーザID */
  armdozerIds: ArmdozerId[];
};

/**
 * PlayerPickerDialogPropsを生成する
 * @param options 生成オプション
 * @returns 生成結果
 */
export const createPlayerPickerDialogProps = (
  options: CreatePlayerPickerDialogPropsOptions,
): PlayerPickerDialogProps => {
  const { armdozerIds, resources } = options;

  const root = document.createElement("div");
  root.className = ROOT;
  root.innerHTML = rootInnerHTML();

  const armdozerIcons = armdozerIds.map((armdozerId) =>
    armdozerIcon({ resources, armdozerId }),
  );
  const armdozerPicker = extractArmdozerPicker(root);
  armdozerPicker.append(...armdozerIcons);

  return { root };
};
