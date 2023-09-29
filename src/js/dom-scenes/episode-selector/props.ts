import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";
import { Resources } from "../../resource";
import {
  createEmptySoundResource,
  SOUND_IDS,
  SoundResource,
} from "../../resource/sound";
import { domUuid } from "../../uuid/dom-uuid";
import { waitElementLoaded } from "../../wait/wait-element-loaded";
import { ROOT_CLASS } from "./dom/class-name";
import { extractElements } from "./dom/elements";
import { rootInnerHTML } from "./dom/root-inner-html";
import { stageSeparator } from "./dom/stage-separator";
import { EpisodeElement } from "./episode-element";
import { Episode } from "./episode-element/episode";
import { EpisodeSelect } from "./episode-element/episode-select";

/** エピソードセレクタ画面プロパティ */
export type EpisodeSelectorProps = {
  /** ルートHTML要素 */
  root: HTMLElement;
  /** エピソード要素をあつめたもの */
  episodeElements: EpisodeElement[];
  /** 戻るボタン */
  prevButton: HTMLElement;
  /** 排他制御 */
  exclusive: Exclusive;
  /** 戻るストリーム */
  prev: Subject<void>;
  /** ステージ選択完了ストリーム */
  stageSelect: Subject<EpisodeSelect>;
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
    stages: domUuid(),
    imageCuts: domUuid(),
    prevButton: domUuid(),
  };
  const root = document.createElement("div");
  root.className = ROOT_CLASS;
  root.innerHTML = rootInnerHTML(ids, resources);
  const elements = extractElements(root, ids);
  const stageElements = episodes.map(
    (stage, index) => new EpisodeElement(resources, stage, index + 1),
  );
  const stageElementsWithLastRemoved = stageElements.slice(0, -1);
  stageElementsWithLastRemoved.forEach((stage) => {
    elements.stages.appendChild(stage.getRootHTMLElement());
    elements.stages.appendChild(stageSeparator());
  });
  const lastStageElement = stageElements[stageElements.length - 1];
  if (lastStageElement) {
    elements.stages.appendChild(lastStageElement.getRootHTMLElement());
  }

  return {
    root,
    episodeElements: stageElements,
    prevButton: elements.prevButton,
    exclusive: new Exclusive(),
    prev: new Subject(),
    stageSelect: new Subject(),
    changeValue:
      resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE) ??
      createEmptySoundResource(),
    isImageCutsLoaded: Promise.all(
      Array.from(elements.imageCuts.children).map((img) =>
        waitElementLoaded(img as HTMLElement),
      ),
    ),
  };
}
