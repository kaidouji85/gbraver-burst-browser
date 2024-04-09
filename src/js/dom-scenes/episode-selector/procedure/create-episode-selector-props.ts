import { Subject } from "rxjs";

import { Exclusive } from "../../../exclusive/exclusive";
import { Resources } from "../../../resource";
import { createEmptySoundResource } from "../../../resource/sound/empty-sound-resource";
import { SOUND_IDS } from "../../../resource/sound/ids";
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
