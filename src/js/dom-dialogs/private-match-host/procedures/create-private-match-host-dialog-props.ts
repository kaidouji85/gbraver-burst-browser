import { Subject } from "rxjs";

import { Exclusive } from "../../../exclusive/exclusive";
import { drawPrivateMatchQRCode } from "../../../qr-code/private-match-qr-code";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { ROOT_CLASS } from "../dom/class-name";
import {
  extractCloser,
  extractCopyRoomID,
  extractQRCode,
} from "../dom/elements";
import { rootInnerHTML } from "../dom/root-inner-html";
import { PrivateMatchHostDialogProps, PropsCreatorParams } from "../props";

/**
 * PrivateMatchHostDialogPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createPrivateMatchHostDialogProps(
  params: PropsCreatorParams,
): PrivateMatchHostDialogProps {
  const { resources, roomID } = params;
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHTML(resources, roomID);

  const closer = extractCloser(root);
  const qrCode = extractQRCode(root);
  const copyRoomID = extractCopyRoomID(root);

  drawPrivateMatchQRCode(qrCode, roomID);
  return {
    ...params,
    root,
    closer,
    copyRoomID,

    changeValue:
      resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE) ??
      createEmptySoundResource(),

    dialogClosed: new Subject(),
    exclusive: new Exclusive(),
  };
}
