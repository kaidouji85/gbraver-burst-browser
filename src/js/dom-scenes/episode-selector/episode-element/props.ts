import { map, Observable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import { Resources } from "../../../resource";
import { domUuid } from "../../../uuid/dom-uuid";
import { ROOT_CLASS } from "./dom/class-name";
import { DataIDs } from "./dom/data-ids";
import { extractElements } from "./dom/elements";
import { rootInnerHTML } from "./dom/root-inner-html";
import { Episode } from "./episode";

/** エピソードHTML要素プロパティ */
export type EpisodeElementProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** チェック */
  checker: HTMLInputElement;
  /** 選択通知ストリーム */
  select: Observable<void>;
};

/**
 * EpisodeElementPropsを生成する
 * @param resources リソース管理オブジェクト
 * @param episode エピソード情報
 * @return 生成結果
 */
export function createEpisodeElementProps(
  resources: Readonly<Resources>,
  episode: Readonly<Episode>,
) {
  const ids: DataIDs = {
    checker: domUuid(),
  };
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHTML(ids, episode);
  const elements = extractElements(root, ids);
  const select = domPushStream(root).pipe(
    map((action) => {
      action.event.preventDefault();
      action.event.stopPropagation();
    }),
  );
  return {
    ...elements,
    root,
    select,
  };
}
