import { Subject } from "rxjs";

import { Exclusive } from "../../../exclusive/exclusive";
import type { ResourcesContainer } from "../../../resource";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SoundResource } from "../../../resource/sound/resource";
import { SEPlayerContainer } from "../../../se/se-player";
import { domUuid } from "../../../uuid/dom-uuid";
import { ROOT_CLASS_INVISIBLE } from "./dom/class-name";
import { extractElements } from "./dom/elements";
import { rootInnerHTML } from "./dom/root-inner-html";

/** 設定変更通知ダイアログプロパティ */
export type ConfigChangedDialogProps = SEPlayerContainer & {
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
  changeValue: SoundResource;
  /** SE ボタン押下 */
  pushButton: SoundResource;

  /** 閉じるストリーム */
  closeStream: Subject<void>;
  /** 設定変更受け入れ通知ストリーム */
  acceptStream: Subject<void>;
  /** 設定変更破棄通知ストリーム */
  discardStream: Subject<void>;
};

/** 生成パラメータ */
export type PropsCreatorParams = ResourcesContainer & SEPlayerContainer;

/**
 * 設定変更通知ダイアログプロパティを生成する
 * @param params 生成パラメータ
 * @returns 生成したダイアログプロパティ
 */
export function createConfigChangedDialogProps(
  params: PropsCreatorParams,
): ConfigChangedDialogProps {
  const { resources } = params;
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
    resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON) ??
    createEmptySoundResource();
  const changeValue =
    resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE) ??
    createEmptySoundResource();
  const exclusive = new Exclusive();
  const closeStream = new Subject<void>();
  const acceptStream = new Subject<void>();
  const discardStream = new Subject<void>();
  return {
    ...params,
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
