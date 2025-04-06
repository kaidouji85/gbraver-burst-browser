import { EpisodeID } from "../../../game/story/episodes/episode";
import { Resources } from "../../../resource";
import { PathId } from "../../../resource/path/resource";
import { waitElementLoaded } from "../../../wait/wait-element-loaded";
import { EPISODE_IMAGE_CUT, EPISODE_IMAGE_CUT_INVISIBLE } from "./class-name";

/** イメージカット設定 */
type EpisodeImageCutConfig = {
  /** エピソードID */
  id: EpisodeID;
  /** イメージカットのパスID */
  imageCutPathId: PathId;
};

/** イメージカット */
export interface EpisodeImageCut {
  /** エピソードID */
  readonly id: EpisodeID;
  /** イメージカットのイメージ要素 */
  readonly image: HTMLImageElement;
  /** イメージカットの読み込み完了したら発火するPromise */
  readonly waitUntilLoaded: Promise<void>;

  /**
   * イメージカットを表示するか否かを設定する
   * @param isVisible trueで表示
   */
  visible(isVisible: boolean): void;
}

/** イメージカットのシンプルな実装 */
class SimpleEpisodeImageCut implements EpisodeImageCut {
  /** @override */
  id: EpisodeID;
  /** @override */
  image: HTMLImageElement;
  /** @override */
  waitUntilLoaded: Promise<void>;

  /**
   * コンストラクタ
   * @param resources  リソース管理オブジェクト
   * @param config イメージカット設定
   */
  constructor(resources: Resources, config: EpisodeImageCutConfig) {
    this.id = config.id;
    this.image = document.createElement("img");
    this.waitUntilLoaded = waitElementLoaded(this.image);
    this.image.src =
      resources.paths.find((v) => v.id === config.imageCutPathId)?.path ?? "";
  }

  /** @override */
  visible(isVisible: boolean): void {
    this.image.className = isVisible
      ? EPISODE_IMAGE_CUT
      : EPISODE_IMAGE_CUT_INVISIBLE;
  }
}

/**
 * イメージカットを生成する
 * @param resources リソース管理オブジェクト
 * @param config イメージカット設定
 * @returns 生成結果
 */
export function createEpisodeImageCut(
  resources: Resources,
  config: EpisodeImageCutConfig,
): EpisodeImageCut {
  return new SimpleEpisodeImageCut(resources, config);
}
