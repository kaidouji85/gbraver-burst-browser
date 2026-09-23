import { ArmdozerId, PilotId } from "gbraver-burst-core";

import { createArmdozerIcon } from "../dom/armdozer-icon";
import { ROOT } from "../dom/class-name";
import {
  extractArmdozerPicker,
  extractPilotPicker,
} from "../dom/extract-element";
import { pilotIcon } from "../dom/pilot-icon";
import { rootInnerHTML, RootInnerHTMLOptions } from "../dom/root-inner-html";
import { PlayerPickerDialogProps } from "../props";

/** プロパティの生成オプション */
export type CreatePlayerPickerDialogPropsOptions = RootInnerHTMLOptions & {
  /** ピッカーで選択可能なアームドーザID */
  armdozerIds: ArmdozerId[];
  /** ピッカーで選択可能なパイロットID */
  pilotIds: PilotId[];
};

/**
 * PlayerPickerDialogPropsを生成する
 * @param options 生成オプション
 * @returns 生成結果
 */
export const createPlayerPickerDialogProps = (
  options: CreatePlayerPickerDialogPropsOptions,
): PlayerPickerDialogProps => {
  const { armdozerIds, pilotIds, resources } = options;

  const root = document.createElement("div");
  root.className = ROOT;
  root.innerHTML = rootInnerHTML(options);

  const armdozerIcons = armdozerIds.map((armdozerId) =>
    createArmdozerIcon({ resources, armdozerId }),
  );
  const armdozerPicker = extractArmdozerPicker(root);
  armdozerPicker.append(...armdozerIcons.map((icon) => icon.getRootElement()));

  const pilotIcons = pilotIds.map((pilotId) =>
    pilotIcon({ resources, pilotId }),
  );
  const pilotPicker = extractPilotPicker(root);
  pilotPicker.append(...pilotIcons);

  return { root, armdozerIcons };
};
