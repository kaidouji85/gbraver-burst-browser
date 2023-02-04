import { Exclusive } from "../../exclusive/exclusive";
import { Resources } from "../../resource";
import { domUuid } from "../../uuid/dom-uuid";
import { ROOT_CLASS } from "./dom/class-name";
import { DataIDs } from "./dom/data-ids";
import { extractElements } from "./dom/elements";
import { rootInnerHTML } from "./dom/inner-html";
import {createEmptySoundResource, SOUND_IDS, SoundResource} from "../../resource/sound";

/** プライベートマッチホストダイアログのプロパティ */
export type PrivateMatchHostDialogProps = {
  /** ルート要素HTML */
  root: HTMLElement;
  /** クロージャ */
  closer: HTMLElement;
  /** 背景 */
  background: HTMLElement;
  /** 効果音 値変更 */
  changeValue: SoundResource;
  /** 排他制御 */
  exclusive: Exclusive;
};

/**
 * PrivateMatchHostDialogPropsを生成する
 * @param resources リソース管理オブジェクト
 * @param roomID ルームID
 * @return 生成結果
 */
export function createPrivateMatchHostDialogProps(
  resources: Resources,
  roomID: string
): PrivateMatchHostDialogProps {
  const ids: DataIDs = {
    background: domUuid(),
    closer: domUuid(),
  };
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHTML(resources, ids, roomID);
  const elements = extractElements(root, ids);
  return {
    root,
    closer: elements.closer,
    background: elements.background,
    changeValue: resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE)
      ?? createEmptySoundResource(),
    exclusive: new Exclusive(),
  };
}
