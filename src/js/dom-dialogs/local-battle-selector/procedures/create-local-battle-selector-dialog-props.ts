import { Subject } from "rxjs";

import { Exclusive } from "../../../exclusive/exclusive";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SEPlayerContainer } from "../../../se/se-player";
import { ROOT_CLASS } from "../dom/class-name";
import { rootInnerHTML, RootInnerHTMLOptions } from "../dom/root-inner-html";
import { LocalBattleSelectorDialogProps } from "../props";
import {
  extractLocalBattleGuest,
  extractLocalBattleHost,
} from "./extract-element";

/** ローカル対戦セレクターダイアログのプロパティ作成オプション */
export type CreateLocalBattleSelectorPropsOptions = RootInnerHTMLOptions &
  SEPlayerContainer;

/**
 * ローカル対戦セレクターダイアログのプロパティを作成する
 * @param options 作成オプション
 * @returns 作成したプロパティ
 */
export const createLocalBattleSelectorDialogProps = (
  options: CreateLocalBattleSelectorPropsOptions,
): LocalBattleSelectorDialogProps => {
  const { se, resources } = options;

  const root = document.createElement("div");
  root.innerHTML = rootInnerHTML(options);
  root.className = ROOT_CLASS;

  const localBattleHostButton = extractLocalBattleHost(root);
  const localBattleGuestButton = extractLocalBattleGuest(root);

  const pushButtonSound =
    resources.sounds.find((s) => s.id === SOUND_IDS.PUSH_BUTTON) ??
    createEmptySoundResource();

  const localBattleHostSelection = new Subject<void>();
  const localBattleGuestSelection = new Subject<void>();

  const exclusive = new Exclusive();

  return {
    root,
    localBattleHostButton,
    localBattleGuestButton,

    se,
    pushButtonSound,

    localBattleHostSelection,
    localBattleGuestSelection,

    exclusive,
  };
};
