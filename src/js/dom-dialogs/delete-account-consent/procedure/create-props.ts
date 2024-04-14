import { Subject } from "rxjs";

import { Exclusive } from "../../../exclusive/exclusive";
import { Resources } from "../../../resource";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SEPlayer } from "../../../se/se-player";
import { ROOT_CLASS } from "../dom/class-name";
import {
  extractBackGround,
  extractCloseButton,
  extractCloser,
  extractDeleteAccountButton,
} from "../dom/extract-element";
import { rootInnerHTML } from "../dom/root-inner-html";
import { DeleteAccountConsentDialogProps } from "../props";

/** 生成パラメータ */
export type GenerateDeleteAccountConsentDialogPropsParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** SE再生オブジェクト */
  se: SEPlayer;
};

/**
 * DeleteAccountConsentDialogPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createProps(
  params: GenerateDeleteAccountConsentDialogPropsParams,
): DeleteAccountConsentDialogProps {
  const { resources } = params;
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
    resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE) ??
    createEmptySoundResource();
  const pushButton =
    resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON) ??
    createEmptySoundResource();
  const exclusive = new Exclusive();
  return {
    ...params,
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
