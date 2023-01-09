import { Howl } from "howler";

import { Exclusive } from "../../../exclusive/exclusive";
import type { Resources } from "../../../resource";
import { SOUND_IDS } from "../../../resource/sound";
import type { StreamSource } from "../../../stream/stream";
import { createStreamSource } from "../../../stream/stream";
import { domUuid } from "../../../uuid/dom-uuid";
import { ROOT_CLASS_INVISIBLE } from "./dom/class-name";
import { extractElements } from "./dom/elements";
import { rootInnerHTML } from "./dom/root-inner-html";

/** 設定変更通知ダイアログプロパティ */
export type ConfigChangedDialogProps = {
  /** ルートHTML要素 */
  root: HTMLElement;

  /** 背景 */
  backGround: HTMLElement;

  /** クローザ */
  closer: HTMLElement;

  /** 設定変更を破棄 */
  discard: HTMLElement;

  /** 設定変更受け入れ */
  accept: HTMLElement;

  /** 排他制御 */
  exclusive: Exclusive;

  /** SE 値変更 */
  changeValue: Howl;

  /** SE ボタン押下 */
  pushButton: Howl;

  /** 閉じるストリーム */
  closeStream: StreamSource<void>;

  /** 設定変更受け入れ通知ストリーム */
  acceptStream: StreamSource<void>;

  /** 設定変更破棄通知ストリーム */
  discardStream: StreamSource<void>;
};

/**
 * 設定変更通知ダイアログプロパティを生成する
 *
 * @param resources リソース管理オブジェクト
 * @return 生成したダイアログプロパティ
 */
export function createConfigChangedDialogProps(
  resources: Resources
): ConfigChangedDialogProps {
  const ids = {
    backGround: domUuid(),
    closer: domUuid(),
    discard: domUuid(),
    accept: domUuid(),
  };
  const root = document.createElement("div");
  root.className = ROOT_CLASS_INVISIBLE;
  root.innerHTML = rootInnerHTML(resources, ids);
  const elements = extractElements(root, ids);
  const backGround = elements.backGround;
  const closer = elements.closer;
  const discard = elements.discard;
  const accept = elements.accept;
  const pushButton =
    resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON)?.sound ??
    new Howl({ src: "" });
  const changeValue =
    resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE)?.sound ??
    new Howl({ src: "" });
  const exclusive = new Exclusive();
  const closeStream = createStreamSource<void>();
  const acceptStream = createStreamSource<void>();
  const discardStream = createStreamSource<void>();
  return {
    root,
    backGround,
    closer,
    discard,
    accept,
    pushButton,
    changeValue,
    exclusive,
    closeStream,
    acceptStream,
    discardStream,
  };
}
