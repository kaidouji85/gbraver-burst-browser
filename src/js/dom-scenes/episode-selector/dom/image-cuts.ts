import { EpisodeID } from "../../../game/episodes/episode";
import { Resources } from "../../../resource";
import { PathId } from "../../../resource/path/resource";
import { waitElementLoaded } from "../../../wait/wait-element-loaded";

/** イメージカット設定 */
type ImageCutConfig = {
  /** エピソードID */
  id: EpisodeID;
  /** イメージカットのパスID */
  imageCutPathId: PathId;
};

/** イメージカット */
interface ImageCut {
  /** エピソードID */
  id: EpisodeID;
  /** イメージカットのイメージ要素 */
  image: HTMLImageElement;
  /** イメージカットの読み込み完了したら発火するPromise */
  waitUntilLoaded: Promise<void>;
}

/**
 * イメージカットを生成する
 * @param resources リソース管理オブジェクト
 * @param config イメージカット設定
 * @return 生成結果
 */
export function createImageCut(
  resources: Resources,
  config: ImageCutConfig,
): ImageCut {
  const image = document.createElement("img");
  const waitUntilLoaded = waitElementLoaded(image);
  image.src =
    resources.paths.find((v) => v.id === config.imageCutPathId)?.path ?? "";
  return {
    id: config.id,
    image,
    waitUntilLoaded,
  };
}
