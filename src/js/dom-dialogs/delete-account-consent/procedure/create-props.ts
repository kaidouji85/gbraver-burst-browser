import { Howl } from "howler";
import { Subject } from "rxjs";

import { Exclusive } from "../../../exclusive/exclusive";
import { Resources } from "../../../resource";
import { SOUND_IDS } from "../../../resource/sound";
import { ROOT_CLASS } from "../dom/class-name";
import {
  extractBackGround,
  extractCloseButton,
  extractCloser,
  extractDeleteAccountButton,
} from "../dom/extract-element";
import { rootInnerHTML } from "../dom/root-inner-html";
import { DeleteAccountConsentDialogProps } from "../props";

/**
 * DeleteAccountConsentDialogPropsを生成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function createProps(
  resources: Resources,
): DeleteAccountConsentDialogProps {
  const root = document.createElement("div");
  root.innerHTML = rootInnerHTML(resources);
  root.className = ROOT_CLASS;
  const backGround = extractBackGround(root);
  const closer = extractCloser(root);
  const deleteAccountButton = extractDeleteAccountButton(root);
  const closeButton = extractCloseButton(root);
  const deleteAccount = new Subject<void>();
  const closeDialog = new Subject<void>();
  const changeValue =
    resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE)?.sound ??
    new Howl({ src: "" });
  const pushButton =
    resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON)?.sound ??
    new Howl({ src: "" });
  const exclusive = new Exclusive();
  return {
    root,
    backGround,
    closer,
    deleteAccountButton,
    closeButton,
    deleteAccount,
    closeDialog,
    changeValue,
    pushButton,
    exclusive,
  };
}
