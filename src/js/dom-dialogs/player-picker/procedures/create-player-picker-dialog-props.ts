import { ArmdozerId, PilotId } from "gbraver-burst-core";
import { Subject } from "rxjs";

import { Exclusive } from "../../../exclusive/exclusive";
import { ResourcesContainer } from "../../../resource";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SEPlayerContainer } from "../../../se/se-player";
import { createArmdozerIcon } from "../dom/armdozer-icon";
import { ROOT } from "../dom/class-name";
import {
  extractArmdozerPicker,
  extractGotoTitleButton,
  extractPilotPicker,
  extractRetryButton,
} from "../dom/extract-element";
import { createPilotIcon } from "../dom/pilot-icon";
import { rootInnerHTML } from "../dom/root-inner-html";
import { PlayerSelection } from "../player-selection";
import { PlayerPickerDialogProps } from "../props";

/** プロパティの生成オプション */
export type CreatePlayerPickerDialogPropsOptions = ResourcesContainer &
  SEPlayerContainer & {
    /** ピッカーで選択可能なアームドーザID */
    armdozerIds: ArmdozerId[];
    /** ピッカーで選択可能なパイロットID */
    pilotIds: PilotId[];
    /** アームドーザIDの初期値 */
    initialArmdozerId: ArmdozerId;
    /** パイロットIDの初期値 */
    initialPilotId: PilotId;
  };

/**
 * PlayerPickerDialogPropsを生成する
 * @param options 生成オプション
 * @returns 生成結果
 */
export const createPlayerPickerDialogProps = (
  options: CreatePlayerPickerDialogPropsOptions,
): PlayerPickerDialogProps => {
  const {
    resources,
    se,
    armdozerIds,
    pilotIds,
    initialArmdozerId,
    initialPilotId,
  } = options;

  const root = document.createElement("div");
  root.className = ROOT;
  root.innerHTML = rootInnerHTML();

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
  pilotIcons.forEach((icon) => {
    const isChecked = icon.pilotId === initialPilotId;
    icon.checked(isChecked);
  });
  const pilotPicker = extractPilotPicker(root);
  pilotPicker.append(...pilotIcons.map((icon) => icon.getRootElement()));

  const changeValueSound =
    resources.sounds.find((s) => s.id === SOUND_IDS.CHANGE_VALUE) ??
    createEmptySoundResource();
  const pushButtonSound =
    resources.sounds.find((s) => s.id === SOUND_IDS.PUSH_BUTTON) ??
    createEmptySoundResource();

  return {
    selectedArmdozerId: initialArmdozerId,
    selectedPilotId: initialPilotId,

    root,
    gotoTitleButton: extractGotoTitleButton(root),
    retryButton: extractRetryButton(root),
    armdozerIcons,
    pilotIcons,

    se,
    changeValueSound,
    pushButtonSound,

    gotoTitleSubject: new Subject<void>(),
    retrySubject: new Subject<PlayerSelection>(),

    exclusive: new Exclusive(),
  };
};
