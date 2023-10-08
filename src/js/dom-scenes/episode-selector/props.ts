import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";
import { Resources } from "../../resource";
import {
  createEmptySoundResource,
  SOUND_IDS,
  SoundResource,
} from "../../resource/sound";
import { domUuid } from "../../uuid/dom-uuid";
import { ROOT_CLASS } from "./dom/class-name";
import { extractElements } from "./dom/elements";
import { episodeSeparator } from "./dom/episode-separator";
import { rootInnerHTML } from "./dom/root-inner-html";
import { EpisodeElement } from "./episode-element";
import { Episode } from "./episode-element/episode";
import { EpisodeSelect } from "./episode-element/episode-select";

/** エピソードセレクタ画面プロパティ */
export type EpisodeSelectorProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** エピソード要素をあつめたもの */
  episodeElements: EpisodeElement[];
  /** エピソードのイメージカット */
  episodeImageCut: HTMLImageElement;
  /** エピソードタイトル */
  episodeTitle: HTMLElement;
  /** エピソード導入 */
  episodeIntroduction: HTMLElement;
  /** 戻るボタン */
  prevButton: HTMLElement;
  /** 排他制御 */
  exclusive: Exclusive;
  /** 戻るストリーム */
  prev: Subject<void>;
  /** エピソード選択ストリーム */
  episodeSelect: Subject<EpisodeSelect>;
  /** 値変更効果音 */
  changeValue: SoundResource;
  /** イメージカットのロード完了したら発火するPromise */
  isImageCutsLoaded: Promise<unknown>;
};

/**
 * EpisodeSelectorPropsを生成する
 * @param resources リソース管理オブジェクト
 * @param episodes エピソード
 * @return 生成したEpisodeSelectorProps
 */
export function createEpisodeSelectorProps(
  resources: Resources,
  episodes: Episode[],
): EpisodeSelectorProps {
  const ids = {
    episodes: domUuid(),
    episodeImageCut: domUuid(),
    episodeTitle: domUuid(),
    episodeIntroduction: domUuid(),
    prevButton: domUuid(),
  };
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHTML(ids, resources);
  const elements = extractElements(root, ids);
  const episodeElements = episodes.map(
    (episode) => new EpisodeElement(resources, episode),
  );
  const stageElementsWithLastRemoved = episodeElements.slice(0, -1);
  stageElementsWithLastRemoved.forEach((stage) => {
    elements.episodes.appendChild(stage.getRootHTMLElement());
    elements.episodes.appendChild(episodeSeparator());
  });
  const lastStageElement = episodeElements[episodeElements.length - 1];
  if (lastStageElement) {
    elements.episodes.appendChild(lastStageElement.getRootHTMLElement());
  }

  return {
    root,
    episodeElements: episodeElements,
    episodeImageCut: elements.episodeImageCut,
    episodeTitle: elements.episodeTitle,
    episodeIntroduction: elements.episodeIntroduction,
    prevButton: elements.prevButton,
    exclusive: new Exclusive(),
    prev: new Subject(),
    episodeSelect: new Subject(),
    changeValue:
      resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE) ??
      createEmptySoundResource(),
    isImageCutsLoaded: Promise.resolve(),
  };
}
