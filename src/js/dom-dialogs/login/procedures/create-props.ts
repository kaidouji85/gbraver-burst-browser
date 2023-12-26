import { Howl } from "howler";
import { Subject } from "rxjs";

import { Exclusive } from "../../../exclusive/exclusive";
import { Resources } from "../../../resource";
import { SOUND_IDS } from "../../../resource/sound";
import { ROOT_CLASS_NAME } from "../dom/class-name";
import {
  extractCloseButton,
  extractCloser,
  extractLoginButton,
} from "../dom/extract-element";
import { rootInnerHTML } from "../dom/root-inner-html";
import { LoginDialogProps } from "../props";

/**
 * LoginDialogPropsを生成する
 * @param resources リソース管理オブジェクト
 * @param caption キャプション
 * @return 生成結果
 */
export function createProps(
  resources: Resources,
  caption: string,
): LoginDialogProps {
  const root = document.createElement("div");
  root.className = ROOT_CLASS_NAME;
  root.innerHTML = rootInnerHTML(resources, caption);

  const closer = extractCloser(root);
  const loginButton = extractLoginButton(root);
  const closeButton = extractCloseButton(root);

  const closeDialog = new Subject<void>();
  const login = new Subject<void>();
  const changeValue =
    resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE)?.sound ??
    new Howl({ src: "" });
  const pushButton =
    resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON)?.sound ??
    new Howl({ src: "" });
  const exclusive = new Exclusive();

  return {
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
