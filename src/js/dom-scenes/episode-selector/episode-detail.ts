import { EpisodeID } from "../../game/story/episode";
import { Resources } from "../../resource";
import { Episode } from "./episode";

/** エピソード詳細で利用する情報 */
export type EpisodeDetail = {
  /** エピソードID */
  id: EpisodeID;
  /** タイトル */
  title: string;
  /** イメージカットのパス */
  imageCutPath: string;
  /** 導入 */
  introduction: string;
};

/**
 * EpisodeからEpisodeDetailを生成する
 * @param resources リソース管理オブジェクト
 * @param origin エピソード情報
 * @returns 生成結果
 */
export function createEpisodeDetail(
  resources: Resources,
  origin: Episode,
): EpisodeDetail {
  return {
    id: origin.id,
    title: `Episode${origin.number}. ${origin.title}`,
    imageCutPath:
      resources.paths.find((v) => v.id === origin.imageCutPathId)?.path ?? "",
    introduction: origin.introduction,
  };
}
