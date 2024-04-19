import { Subject } from "rxjs";

import { Exclusive } from "../../exclusive/exclusive";
import { SoundResource } from "../../resource/sound/resource";
import { SEPlayerContainer } from "../../se/se-player";
import { EpisodeImageCut } from "./dom/episode-image-cut";
import { EpisodeDetail } from "./episode-detail";
import { EpisodeElement } from "./episode-element";
import { EpisodeSelect } from "./episode-element/episode-select";

/** エピソードセレクタ画面プロパティ */
export type EpisodeSelectorProps = SEPlayerContainer & {
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
