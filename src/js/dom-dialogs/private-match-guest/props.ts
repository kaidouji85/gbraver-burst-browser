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
  extractDummyQRCodeReader,
  extractEnterButton,
  extractRoomID,
  extractStartQRCodeReader,
} from "./dom/elements";
import { rootInnerHtml } from "./dom/root-inner-html";
import {
  PrivateMatchQRCodeReader,
  PrivateMatchQRCodeReaderParams,
} from "./qr-code-reader";

/** プライベートマッチゲストダイアログのプロパティ */
export type PrivateMatchGuestDialogProps = SEPlayerContainer & {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** クロージャ */
  closer: HTMLElement;
  /** ルームIDテキスト入力フォーム */
  roomID: HTMLInputElement;
  /** QRコードリーダー開始ボタン */
  startQRCodeReader: HTMLButtonElement;
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
