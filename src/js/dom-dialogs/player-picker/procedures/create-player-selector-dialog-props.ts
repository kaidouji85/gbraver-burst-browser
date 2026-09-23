import { ArmdozerId, PilotId } from "gbraver-burst-core";

import { ResourcesContainer } from "../../../resource";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SEPlayerContainer } from "../../../se/se-player";
import { createArmdozerIcon } from "../dom/armdozer-icon";
import { ROOT } from "../dom/class-name";
import {
  extractArmdozerPicker,
  extractPilotPicker,
} from "../dom/extract-element";
import { createPilotIcon } from "../dom/pilot-icon";
import { rootInnerHTML, RootInnerHTMLOptions } from "../dom/root-inner-html";
import { PlayerPickerDialogProps } from "../props";

/** プロパティの生成オプション */
export type CreatePlayerPickerDialogPropsOptions = ResourcesContainer &
  SEPlayerContainer &
  RootInnerHTMLOptions & {
    /** ピッカーで選択可能なアームドーザID */
    armdozerIds: ArmdozerId[];
    /** ピッカーで選択可能なパイロットID */
    pilotIds: PilotId[];
    /** アームドーザIDの初期値 */
    initialArmdozerId: ArmdozerId;
  };

/**
 * PlayerPickerDialogPropsを生成する
 * @param options 生成オプション
 * @returns 生成結果
 */
export const createPlayerPickerDialogProps = (
  options: CreatePlayerPickerDialogPropsOptions,
): PlayerPickerDialogProps => {
  const { resources, se, armdozerIds, pilotIds, initialArmdozerId } = options;

  const root = document.createElement("div");
  root.className = ROOT;
  root.innerHTML = rootInnerHTML(options);

  const armdozerIcons = armdozerIds.map((armdozerId) =>
    createArmdozerIcon({ resources, armdozerId }),
  );
  armdozerIcons.forEach((icon) => {
    const isChecked = icon.armdozerId === initialArmdozerId;
    icon.checked(isChecked);
  });
  const armdozerPicker = extractArmdozerPicker(root);
  armdozerPicker.append(...armdozerIcons.map((icon) => icon.getRootElement()));

  const pilotIcons = pilotIds.map((pilotId) =>
    createPilotIcon({ resources, pilotId }),
  );
  const pilotPicker = extractPilotPicker(root);
  pilotPicker.append(...pilotIcons.map((icon) => icon.getRootElement()));

  const changeValueSound =
    resources.sounds.find((s) => s.id === SOUND_IDS.CHANGE_VALUE) ??
    createEmptySoundResource();

  return {
    selectedArmdozerId: initialArmdozerId,

    root,
    armdozerIcons,

    se,
    changeValueSound,
  };
};
