import { ArmdozerId } from "gbraver-burst-core";

import { EpisodeNumber } from "../../../game/story/episode";
import { ResourcesContainer } from "../../../resource";
import { PathId } from "../../../resource/path/resource";
import { createArmdozerPictureConfig } from "./armdozer-picture-config";
import { ROOT_CLASS } from "./class-name";
import rootInnerHTMLTemplate from "./root-inner-html.hbs";

/** ルート要素innerHTMLのパラメータ */
export type RootInnerHTMLParams = ResourcesContainer & {
  /** エピソード番号 */
  number: EpisodeNumber;
  /** タイトル */
  title: string;
  /** タイトルに表示するアームドーザのID */
  armdozerId: ArmdozerId;
  /** エピソードイメージカットのパスID */
  imageCutPathId: PathId;
};

/**
 * ルート要素のinnerHTML
 *
 * @param params パラメータ
 * @returns innerHTML
 */
export function rootInnerHtml(params: RootInnerHTMLParams): string {
  const { resources, armdozerId, imageCutPathId } = params;
  const pictureConfig = createArmdozerPictureConfig(resources, armdozerId);
  const { bustShot, stand } = pictureConfig;
  const imageCut =
    resources.paths.find((p) => p.id === imageCutPathId)?.path ?? "";
  return rootInnerHTMLTemplate({
    params,
    ROOT_CLASS,
    bustShot,
    stand,
    imageCut,
  });
}
