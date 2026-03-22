import { Subject } from "rxjs";

import { Exclusive } from "../../../exclusive/exclusive";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SEPlayerContainer } from "../../../se/se-player";
import { ROOT_CLASS } from "../dom/class-name";
import { extractBattleStart, extractCloser, extractPassword } from "../dom/extract-element";
import { rootInnerHTML, RootInnerHTMLOptions } from "../dom/root-inner-html";
import { BattleStartPayload, LocalBattleGuestDialogProps } from "../props";

/** ダイアログのプロパティを生成するオプション */
export type CreateLocalBattleGuestDialogPropsOptions = RootInnerHTMLOptions &
  SEPlayerContainer;

/**
 * ダイアログのプロパティを生成する
 * @returns 生成したプロパティ
 */
export const createLocalBattleGuestDialogProps = (
  options: CreateLocalBattleGuestDialogPropsOptions,
): LocalBattleGuestDialogProps => {
  const { se, resources } = options;

  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHTML(options);

  const closer = extractCloser(root);

  const password = extractPassword(root);

  const battleStartButton = extractBattleStart(root);

  const battleStartSound =
    resources.sounds.find((s) => s.id === SOUND_IDS.PUSH_BUTTON) ??
    createEmptySoundResource();

  const battleStartSubject = new Subject<BattleStartPayload>();

  const exclusive = new Exclusive();

  return {
    root,
    closer,
    password,
    battleStartButton,

    se,
    battleStartSound,

    battleStartSubject,

    exclusive,
  };
};
