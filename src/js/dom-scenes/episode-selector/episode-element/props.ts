import { Observable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import { domUuid } from "../../../uuid/dom-uuid";
import { Episode } from "../episode";
import { ROOT_CLASS } from "./dom/class-name";
import { DataIDs } from "./dom/data-ids";
import { extractElements } from "./dom/elements";
import { rootInnerHTML } from "./dom/root-inner-html";

/** エピソードHTML要素プロパティ */
export type EpisodeElementProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** チェック */
  checker: HTMLInputElement;
  /** 選択通知ストリーム */
  select: Observable<unknown>;
};

/**
 * EpisodeElementPropsを生成する
 * @param episode エピソード情報
 * @return 生成結果
 */
export function createEpisodeElementProps(episode: Readonly<Episode>) {
  const ids: DataIDs = {
    checker: domUuid(),
  };
  const root: HTMLElement = document.createElement("label");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHTML(ids, episode);
  const elements = extractElements(root, ids);
  const select = domPushStream(root);
  return {
    ...elements,
    root,
    select,
  };
}
