import { ArmdozerId } from "gbraver-burst-core";

import { EpisodeNumber } from "../../../game/episodes/episode";
import { ResourcesContainer } from "../../../resource";
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
};

/**
 * ルート要素のinnerHTML
 *
 * @param params パラメータ
 * @return innerHTML
 */
export function rootInnerHtml(params: RootInnerHTMLParams): string {
  const { resources, armdozerId } = params;
  const pictureConfig = createArmdozerPictureConfig(resources, armdozerId);
  const { bustShot, stand } = pictureConfig;
  return rootInnerHTMLTemplate({
    params,
    ROOT_CLASS,
    bustShot,
    stand,
  });
}
