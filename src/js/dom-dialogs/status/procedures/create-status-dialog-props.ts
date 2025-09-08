import { Subject } from "rxjs";

import { Exclusive } from "../../../exclusive/exclusive";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SEPlayerContainer } from "../../../se/se-player";
import { ROOT } from "../dom/class-name";
import { extractBackGround, extractCloser } from "../dom/extract-element";
import { rootInnerHTML, RootInnerHTMLOptions } from "../dom/root-inner-html";
import { StatusDialogProps } from "../props";

/** オプション */
export type StatusDialogPropsCreatorOptions = RootInnerHTMLOptions &
  SEPlayerContainer;

/**
 * ステータスダイアログのプロパティを生成する
 * @param options オプション
 * @returns ステータスダイアログのプロパティ
 */
export function createStatusDialogProps(
  options: StatusDialogPropsCreatorOptions,
): StatusDialogProps {
  const root = document.createElement("div");
  root.className = ROOT;
  root.innerHTML = rootInnerHTML(options);
  const closer = extractCloser(root);
  const background = extractBackGround(root);

  const exclusive = new Exclusive();

  const changeValueSound =
    options.resources.sounds.find((s) => s.id === SOUND_IDS.CHANGE_VALUE) ??
    createEmptySoundResource();

  const closeNotifier = new Subject<void>();

  return {
    ...options,

    root,
    closer,
    background,

    exclusive,

    changeValueSound,

    closeNotifier,
  };
}
