import { map, Observable } from "rxjs";

import { domClickStream } from "../../../dom/push-dom";
import { Resources } from "../../../resource";
import {
  createEmptySoundResource,
  SOUND_IDS,
  SoundResource,
} from "../../../resource/sound";
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
  check: HTMLElement;
  /** オーバーレイ */
  overlay: HTMLElement;
  /** プッシュボタン効果音 */
  pushButton: SoundResource;
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
    overlay: domUuid(),
    check: domUuid(),
  };
  const pushButton =
    resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON) ??
    createEmptySoundResource();
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHTML(ids, resources, episode);
  const elements = extractElements(root, ids);
  const select = domClickStream(root).pipe(
    map((action) => {
      action.event.preventDefault();
      action.event.stopPropagation();
    }),
  );
  return {
    ...elements,
    root,
    pushButton,
    select,
  };
}
