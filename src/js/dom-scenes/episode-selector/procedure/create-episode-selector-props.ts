import { Subject } from "rxjs";

import { Exclusive } from "../../../exclusive/exclusive";
import { ResourcesContainer } from "../../../resource";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
import { SEPlayerContainer } from "../../../se/se-player";
import { BLOCK } from "../dom/class-name";
import { createEpisodeImageCut } from "../dom/episode-image-cut";
import {
  extractEpisodeImageCutContainer,
  extractEpisodeIntroduction,
  extractEpisodes,
  extractEpisodeTitle,
  extractMainEpisodeTab,
  extractPlayButton,
  extractPrevButton,
  extractSideEpisodeTab,
} from "../dom/extract-element";
import { rootInnerHTML } from "../dom/root-inner-html";
import { Episode } from "../episode";
import { createEpisodeDetail } from "../episode-detail";
import { EpisodeElement } from "../episode-element";
import { EpisodeSelectorProps } from "../props";

/** EpisodeSelectorProps生成パラメータ */
export type PropsCreatorParams = ResourcesContainer &
  SEPlayerContainer & {
    /** エピソード */
    episodes: Episode[];
  };

/**
 * EpisodeSelectorPropsを生成する
 * @param params 生成パラメータ
 * @returns 生成したEpisodeSelectorProps
 */
export function createEpisodeSelectorProps(
  params: PropsCreatorParams,
): EpisodeSelectorProps {
  const { resources, episodes } = params;
  const root = document.createElement("div");
  root.className = BLOCK;
  root.innerHTML = rootInnerHTML();

  const episodeElements = episodes.map(
    (episode) => new EpisodeElement(resources, episode),
  );
  const extractedEpisodes = extractEpisodes(root);
  episodeElements.forEach((episodeElement) => {
    extractedEpisodes.appendChild(episodeElement.getRootHTMLElement());
  });

  const episodeImageCuts = episodes.map((v) =>
    createEpisodeImageCut(resources, v),
  );
  const episodeImageCutContainer = extractEpisodeImageCutContainer(root);
  episodeImageCuts.forEach((episodeImageCut) => {
    episodeImageCutContainer.appendChild(episodeImageCut.image);
  });
  return {
    ...params,
    root,
    episodeElements,
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
