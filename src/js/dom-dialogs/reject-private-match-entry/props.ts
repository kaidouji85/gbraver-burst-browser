import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";
import { ResourcesContainer } from "../../resource";
import { createEmptySoundResource } from "../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../resource/sound/ids";
import { SoundResource } from "../../resource/sound/resource";
import { SEPlayerContainer } from "../../se/se-player";
import { domUuid } from "../../uuid/dom-uuid";
import { ROOT_CLASS } from "./dom/class-name";
import { DataIDs } from "./dom/data-ids";
import { extractElements } from "./dom/elements";
import { rootInnerHTML } from "./dom/root-inner-html";

/** RejectPrivateMatchEntryDialogのプロパティ */
export type RejectPrivateMatchEntryDialogProps = SEPlayerContainer & {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** クロージャ */
  closer: HTMLElement;
  /** 背景 */
  background: HTMLElement;
  /** 閉じるボタン */
  closeButton: HTMLElement;
  /** 効果音 プッシュボタン */
  pushButton: SoundResource;
  /** 効果音 値変更 */
  changeValue: SoundResource;
  /** ダイアログ閉じる通知 */
  dialogClosed: Subject<void>;
  /** 排他制御 */
  exclusive: Exclusive;
};

/** RejectPrivateMatchEntryDialogProps生成パラメータ */
export type PropsCreatorParams = ResourcesContainer & SEPlayerContainer;

/**
 * RejectPrivateMatchEntryDialogPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createRejectPrivateMatchEntryDialogProps(
  params: PropsCreatorParams,
): RejectPrivateMatchEntryDialogProps {
  const { resources, se } = params;
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  const dataIDs: DataIDs = {
    closer: domUuid(),
    background: domUuid(),
    closeButton: domUuid(),
  };
  root.innerHTML = rootInnerHTML(resources, dataIDs);
  const elements = extractElements(root, dataIDs);
  return {
    ...elements,
    root,
    pushButton:
      resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON) ??
      createEmptySoundResource(),
    changeValue:
      resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE) ??
      createEmptySoundResource(),
    se,
    dialogClosed: new Subject(),
    exclusive: new Exclusive(),
  };
}
