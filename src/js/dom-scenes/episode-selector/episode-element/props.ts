import { Subject } from "rxjs";

import { Resources } from "../../../resource";
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
  checker: HTMLElement;
  /** 選択通知ストリーム */
  select: Subject<void>;
};

/**
 * EpisodeElementPropsを生成する
 * @param resources リソース管理オブジェクト
 * @param episode エピソード情報
 * @return 生成結果
 */
export function createEpisodeElementProps(resources: Resources, episode: Readonly<Episode>) {
  const ids: DataIDs = {
    checker: domUuid(),
  };
  const root: HTMLElement = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHTML(resources, ids, episode);
  const elements = extractElements(root, ids);
  const select = new Subject<void>();
  return {
    ...elements,
    root,
    select,
  };
}
