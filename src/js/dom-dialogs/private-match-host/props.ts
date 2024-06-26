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

/** プライベートマッチホストダイアログのプロパティ */
export type PrivateMatchHostDialogProps = SEPlayerContainer & {
  /** ルート要素HTML */
  root: HTMLElement;
  /** クロージャ */
  closer: HTMLElement;
  /** 効果音 値変更 */
  changeValue: SoundResource;
  /** 排他制御 */
  exclusive: Exclusive;
  /** ダイアログ閉じる通知 */
  dialogClosed: Subject<void>;
};

/** PrivateMatchHostDialogProps生成パラメータ */
export type PropsCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** ルームID */
    roomID: string;
  };

/**
 * PrivateMatchHostDialogPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function createPrivateMatchHostDialogProps(
  params: PropsCreatorParams,
): PrivateMatchHostDialogProps {
  const { resources, roomID } = params;
  const ids: DataIDs = {
    closer: domUuid(),
  };
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHTML(resources, ids, roomID);
  const elements = extractElements(root, ids);
  return {
    ...params,
    root,
    closer: elements.closer,
    changeValue:
      resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE) ??
      createEmptySoundResource(),
    dialogClosed: new Subject(),
    exclusive: new Exclusive(),
  };
}
