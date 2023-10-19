import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";
import { Resources } from "../../resource";
import {
  createEmptySoundResource,
  SOUND_IDS,
  SoundResource,
} from "../../resource/sound";
import { BLOCK } from "./dom/class-name";
import {
  createEpisodeImageCut,
  EpisodeImageCut,
} from "./dom/episode-image-cut";
import {
  extractEpisodeImageCutContainer,
  extractEpisodeIntroduction,
  extractEpisodes,
  extractEpisodeTitle,
  extractMainEpisodeTab,
  extractPlayButton,
  extractPrevButton,
  extractSideEpisodeTab,
} from "./dom/extract-element";
import { rootInnerHTML } from "./dom/root-inner-html";
import { Episode } from "./episode";
import { createEpisodeDetail, EpisodeDetail } from "./episode-detail";
import { EpisodeElement } from "./episode-element";
import { EpisodeSelect } from "./episode-element/episode-select";

/** エピソードセレクタ画面プロパティ */
export type EpisodeSelectorProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** エピソード要素をあつめたもの */
  episodeElements: EpisodeElement[];
  /** イメージカットを集めたもの */
  episodeImageCuts: EpisodeImageCut[];
  /** メインエピソードタブ */
  mainEpisodeTab: HTMLElement;
  /** サイドエピソードタブ */
  sideEpisodeTab: HTMLElement;
  /** エピソードタイトル */
  episodeTitle: HTMLElement;
  /** エピソード導入 */
  episodeIntroduction: HTMLElement;
  /** このエピソードをプレイボタン */
  playButton: HTMLElement;
  /** 戻るボタン */
  prevButton: HTMLElement;
  /** エピソード詳細をあつめたもの */
  episodeDetails: EpisodeDetail[];
  /** 排他制御 */
  exclusive: Exclusive;
  /** 戻るストリーム */
  prev: Subject<void>;
  /** エピソード選択ストリーム */
  episodeSelect: Subject<EpisodeSelect>;
  /** 値変更 効果音 */
  changeValueSound: SoundResource;
  /** ボタン押下 効果音 */
  pushButtonSound: SoundResource;
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
  const root = document.createElement("div");
  root.className = BLOCK;
  root.innerHTML = rootInnerHTML(resources);
  const episodeElements = episodes.map(
    (episode) => new EpisodeElement(resources, episode),
  );
  const episodesElement = extractEpisodes(root);
  episodeElements.forEach((episodeElement) => {
    episodesElement.appendChild(episodeElement.getRootHTMLElement());
  });
  const episodeImageCuts = episodes.map((v) =>
    createEpisodeImageCut(resources, v),
  );
  const episodeImageCutContainer = extractEpisodeImageCutContainer(root);
  episodeImageCuts.forEach((episodeImageCut) => {
    episodeImageCutContainer.appendChild(episodeImageCut.image);
  });
  return {
    root,
    episodeElements: episodeElements,
    episodeImageCuts,
    mainEpisodeTab: extractMainEpisodeTab(root),
    sideEpisodeTab: extractSideEpisodeTab(root),
    episodeTitle: extractEpisodeTitle(root),
    episodeIntroduction: extractEpisodeIntroduction(root),
    playButton: extractPlayButton(root),
    prevButton: extractPrevButton(root),
    episodeDetails: episodes.map((v) => createEpisodeDetail(resources, v)),
    exclusive: new Exclusive(),
    prev: new Subject(),
    episodeSelect: new Subject(),
    changeValueSound:
      resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE) ??
      createEmptySoundResource(),
    pushButtonSound:
      resources.sounds.find((v) => v.id === SOUND_IDS.PUSH_BUTTON) ??
      createEmptySoundResource(),
    isImageCutsLoaded: Promise.all(
      episodeImageCuts.map((v) => v.waitUntilLoaded),
    ),
  };
}
