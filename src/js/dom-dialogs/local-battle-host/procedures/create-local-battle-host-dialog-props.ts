import { Subject } from "rxjs";

import { Exclusive } from "../../../exclusive/exclusive";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SEPlayerContainer } from "../../../se/se-player";
import { ROOT_CLASS } from "../dom/class-name";
import { extractCloser } from "../dom/extract-element";
import { rootInnerHTML, RootInnerHTMLOptions } from "../dom/root-inner-html";

/** ローカル対戦ホストダイアログのプロパティ生成オプション */
export type CreateLocalBattleHostDialogPropsOptions = RootInnerHTMLOptions &
  SEPlayerContainer;

/**
 * ローカル対戦ホストダイアログのプロパティを生成する
 * @param options 生成オプション
 * @returns 生成されたプロパティ
 */
export const createLocalBattleHostDialogProps = (
  options: CreateLocalBattleHostDialogPropsOptions,
) => {
  const { resources, se } = options;
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHTML(options);

  const closer = extractCloser(root);

  const closeButtonSound =
    resources.sounds.find((s) => s.id === SOUND_IDS.CHANGE_VALUE) ??
    createEmptySoundResource();

  const dialogClosed = new Subject<void>();

  const exclusive = new Exclusive();

  return {
    root,
    closer,

    se,
    closeButtonSound,

    dialogClosed,

    exclusive,
  };
};
