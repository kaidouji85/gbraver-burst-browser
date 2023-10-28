import { EpisodeNumber, EpisodeType } from "../../../game/episodes/episode";
import { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { ROOT_CLASS } from "./class-name";
import type { DataIDs } from "./data-ids";
import rootInnerHTMLTemplate from "./root-inner-html.hbs";

/** ルート要素innerHTMLのパラメータ */
export type RootInnerHTMLParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** エピソードタイプ */
  type: EpisodeType;
  /** エピソード番号 */
  number: EpisodeNumber;
  /** タイトル */
  title: string;
};

/**
 * ルート要素のinnerHTML
 *
 * @param ids data-idをあつめたもの
 * @param params パラメータ
 * @return innerHTML
 */
export function rootInnerHtml(
  ids: DataIDs,
  params: RootInnerHTMLParams,
): string {
  const bustShot =
    params.resources.paths.find((v) => v.id === PathIds.SHIN_BRAVER_BUST_SHOT)
      ?.path ?? "";
  const stand =
    params.resources.paths.find((v) => v.id === PathIds.SHIN_BRAVER_STAND)
      ?.path ?? "";
  return rootInnerHTMLTemplate({
    ids,
    params,
    ROOT_CLASS,
    bustShot,
    stand,
  });
}
