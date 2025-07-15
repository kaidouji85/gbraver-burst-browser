import { Subject } from "rxjs";

import { Exclusive } from "../../../exclusive/exclusive";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SEPlayerContainer } from "../../../se/se-player";
import { ROOT } from "../dom/class-name";
import {
  extractCloseButton,
  extractCloser,
  extractStartTutorialButton,
} from "../dom/elements";
import { rootInnerHTML, RootInnerHTMLOptions } from "../dom/root-inner-html";
import { TutorialDescriptionDialogProps } from "../props";

/** プロパティ生成オプション */
export type TutorialDescriptionDialogPropsOptions = RootInnerHTMLOptions &
  SEPlayerContainer;

/**
 * チュートリアル説明ダイアログのプロパティを生成する
 * @returns チュートリアル説明ダイアログのプロパティ
 */
export const createTutorialDescriptionProps = (
  options: TutorialDescriptionDialogPropsOptions,
): TutorialDescriptionDialogProps => {
  const { resources, se } = options;
  const root = document.createElement("div");
  root.className = ROOT;
  root.innerHTML = rootInnerHTML(options);

  const closer = extractCloser(root);
  const startTutorialButton = extractStartTutorialButton(root);
  const closeButton = extractCloseButton(root);

  const pushButtonSound =
    resources.sounds.find((s) => s.id === SOUND_IDS.PUSH_BUTTON) ??
    createEmptySoundResource();
  const changeValueSound =
    resources.sounds.find((s) => s.id === SOUND_IDS.CHANGE_VALUE) ??
    createEmptySoundResource();

  const exclusive = new Exclusive();

  const closeNotifier = new Subject<void>();
  const startTutorialNotifier = new Subject<void>();

  return {
    root,
    closer,
    startTutorialButton,
    closeButton,

    se,
    pushButtonSound,
    changeValueSound,

    exclusive,

    closeNotifier,
    startTutorialNotifier,
  };
};
