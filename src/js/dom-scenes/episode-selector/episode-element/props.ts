import { Subject } from "rxjs";

import { Resources } from "../../../resource";
import { Episode } from "../episode";
import { BLOCK } from "./dom/class-name";
import { extractChecker } from "./dom/extract-element";
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
export function createEpisodeElementProps(
  resources: Resources,
  episode: Readonly<Episode>,
) {
  const root: HTMLElement = document.createElement("div");
  root.className = BLOCK;
  root.innerHTML = rootInnerHTML(resources, episode);
  return {
    root,
    checker: extractChecker(root),
    select: new Subject<void>(),
  };
}
