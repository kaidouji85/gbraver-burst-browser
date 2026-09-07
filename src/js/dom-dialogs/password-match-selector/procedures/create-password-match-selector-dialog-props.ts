import { Subject } from "rxjs";

import { Exclusive } from "../../../exclusive/exclusive";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SEPlayerContainer } from "../../../se/se-player";
import { ROOT_CLASS } from "../dom/class-name";
import {
  extractBackGround,
  extractCloser,
  extractGuest,
  extractHost,
} from "../dom/extract-element";
import { rootInnerHTML, RootInnerHTMLOptions } from "../dom/root-inner-html";
import { PasswordMatchSelectorDialogProps } from "../props";

/** あいことば対戦セレクターダイアログのプロパティ作成オプション */
export type CreatePasswordMatchSelectorPropsOptions = RootInnerHTMLOptions &
  SEPlayerContainer;

/**
 * あいことば対戦セレクターダイアログのプロパティを作成する
 * @param options 作成オプション
 * @returns 作成したプロパティ
 */
export const createPasswordMatchSelectorDialogProps = (
  options: CreatePasswordMatchSelectorPropsOptions,
): PasswordMatchSelectorDialogProps => {
  const { se, resources } = options;

  const root = document.createElement("div");
  root.innerHTML = rootInnerHTML(options);
  root.className = ROOT_CLASS;

  const closer = extractCloser(root);
  const backGround = extractBackGround(root);
  const hostButton = extractHost(root);
  const guestButton = extractGuest(root);

  const pushButtonSound =
    resources.sounds.find((s) => s.id === SOUND_IDS.PUSH_BUTTON) ??
    createEmptySoundResource();
  const closeButtonSound =
    resources.sounds.find((s) => s.id === SOUND_IDS.CHANGE_VALUE) ??
    createEmptySoundResource();

  const hostSelection = new Subject<void>();
  const guestSelection = new Subject<void>();
  const dialogClosed = new Subject<void>();

  const exclusive = new Exclusive();

  return {
    root,
    backGround,
    closer,
    hostButton,
    guestButton,

    se,
    pushButtonSound,
    closeButtonSound,

    hostSelection,
    guestSelection,
    dialogClosed,

    exclusive,
  };
};
