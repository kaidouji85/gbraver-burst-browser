import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";
import { Resources } from "../../resource";
import { createEmptySoundResource } from "../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../resource/sound/ids";
import { SoundResource } from "../../resource/sound/resource";
import { domUuid } from "../../uuid/dom-uuid";
import { ROOT_CLASS } from "./dom/class-name";
import { DataIDs } from "./dom/data-ids";
import { extractElements } from "./dom/elements";
import { rootInnerHTML } from "./dom/root-inner-html";

/** プライベートマッチホストダイアログのプロパティ */
export type PrivateMatchHostDialogProps = {
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

/**
 * PrivateMatchHostDialogPropsを生成する
 * @param resources リソース管理オブジェクト
 * @param roomID ルームID
 * @return 生成結果
 */
export function createPrivateMatchHostDialogProps(
  resources: Resources,
  roomID: string,
): PrivateMatchHostDialogProps {
  const ids: DataIDs = {
    closer: domUuid(),
  };
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHTML(resources, ids, roomID);
  const elements = extractElements(root, ids);
  return {
    root,
    closer: elements.closer,
    changeValue:
      resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE) ??
      createEmptySoundResource(),
    dialogClosed: new Subject(),
    exclusive: new Exclusive(),
  };
}
