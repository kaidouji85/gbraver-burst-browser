import { Subject } from "rxjs";

import { Exclusive } from "../../../exclusive/exclusive";
import { ResourcesContainer } from "../../../resource";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SEPlayerContainer } from "../../../se/se-player";
import { ROOT_CLASS_NAME } from "../dom/class-name";
import {
  extractCloseButton,
  extractCloser,
  extractLoginButton,
} from "../dom/extract-element";
import { rootInnerHTML } from "../dom/root-inner-html";
import { LoginDialogProps } from "../props";

/** 生成パラメータ */
export type PropsCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** キャプション */
    caption: string;
  };

/**
 * LoginDialogPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createProps(params: PropsCreatorParams): LoginDialogProps {
  const { resources, caption } = params;
  const root = document.createElement("div");
  root.className = ROOT_CLASS_NAME;
  root.innerHTML = rootInnerHTML(resources, caption);

  const closer = extractCloser(root);
  const loginButton = extractLoginButton(root);
  const closeButton = extractCloseButton(root);

  const closeDialog = new Subject<void>();
  const login = new Subject<void>();
  const changeValue =
    resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE) ??
    createEmptySoundResource();
  const pushButton =
    resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON) ??
    createEmptySoundResource();
  const exclusive = new Exclusive();

  return {
    ...params,
    root,
    closer,
    loginButton,
    closeButton,
    closeDialog,
    login,
    changeValue,
    pushButton,
    exclusive,
  };
}
