import { Subject } from "rxjs";

import { replaceDOM } from "../../../dom/replace-dom";
import { Exclusive } from "../../../exclusive/exclusive";
import { ResourcesContainer } from "../../../resource";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SEPlayerContainer } from "../../../se/se-player";
import { ROOT_CLASS } from "../dom/class-name";
import {
  extractCloser,
  extractDummyQRCodeReader,
  extractEnterButton,
  extractRoomID,
  extractStartQRCodeReader,
} from "../dom/elements";
import { rootInnerHtml } from "../dom/root-inner-html";
import { PrivateMatchGuestDialogProps } from "../props";
import {
  PrivateMatchQRCodeReader,
  PrivateMatchQRCodeReaderParams,
} from "../qr-code-reader";

/** PrivateMatchGuestDialogProps生成パラメータ */
export type PropsCreatorParams = ResourcesContainer &
  SEPlayerContainer &
  PrivateMatchQRCodeReaderParams;

/**
 * PrivateMatchGuestDialogPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createPrivateMatchGuestDialogProps(
  params: PropsCreatorParams,
): PrivateMatchGuestDialogProps {
  const { resources, se } = params;

  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHtml(resources);

  const qrCodeReader = new PrivateMatchQRCodeReader(params);
  const qrCodeReaderStarter = extractDummyQRCodeReader(root);
  replaceDOM(qrCodeReaderStarter, qrCodeReader.getRootHTMLElement());
  return {
    root,
    closer: extractCloser(root),
    roomID: extractRoomID(root),
    startQRCodeReader: extractStartQRCodeReader(root),
    enterButton: extractEnterButton(root),

    qrCodeReader,

    exclusive: new Exclusive(),

    dialogClosed: new Subject(),
    privateMatchStart: new Subject(),

    se,
    changeValue:
      resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE) ??
      createEmptySoundResource(),
    pushButton:
      resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON) ??
      createEmptySoundResource(),
  };
}
