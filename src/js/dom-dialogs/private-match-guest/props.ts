import { Subject } from "rxjs";

import { replaceDOM } from "../../dom/replace-dom";
import { Exclusive } from "../../exclusive/exclusive";
import { ResourcesContainer } from "../../resource";
import { createEmptySoundResource } from "../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../resource/sound/ids";
import { SoundResource } from "../../resource/sound/resource";
import { SEPlayerContainer } from "../../se/se-player";
import { ROOT_CLASS } from "./dom/class-name";
import {
  extractCloser,
  extractEnterButton,
  extractRoomID,
  extractStartQRCodeReader,
} from "./dom/elements";
import { rootInnerHtml } from "./dom/root-inner-html";
import { PrivateMatchQRCodeReader } from "./qr-code-reader";

/** プライベートマッチゲストダイアログのプロパティ */
export type PrivateMatchGuestDialogProps = SEPlayerContainer & {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** クロージャ */
  closer: HTMLElement;
  /** ルームID入力フォーム */
  roomID: HTMLInputElement;
  /** プライベートマット開始ボタン */
  enterButton: HTMLElement;

  /** QRコードリーダー */
  qrCodeReader: PrivateMatchQRCodeReader;

  /** 排他制御 */
  exclusive: Exclusive;

  /** 効果音 値変更 */
  changeValue: SoundResource;
  /** 効果音 ボタンプッシュ */
  pushButton: SoundResource;

  /** ダイアログ閉じる通知 */
  dialogClosed: Subject<void>;
  /**
   * プライベートマッチ開始通知
   * ユーザが入力したルームIDをストリームとして渡す
   */
  privateMatchStart: Subject<string>;
};

/** PrivateMatchGuestDialogProps生成パラメータ */
export type PropsCreatorParams = ResourcesContainer & SEPlayerContainer;

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

  const qrCodeReader = new PrivateMatchQRCodeReader();
  const qrCodeReaderStarter = extractStartQRCodeReader(root);
  replaceDOM(qrCodeReaderStarter, qrCodeReader.getRootHTMLElement());
  qrCodeReader.start();
  return {
    root,
    closer: extractCloser(root),
    roomID: extractRoomID(root),
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
