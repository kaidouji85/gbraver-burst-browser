import { EpisodeType } from "../../../../game/episodes/episode";
import { ROOT_CLASS } from "./class-name";
import { DataIDs } from "./data-ids";
import rootInnerHTMLTemplate from "./root-inner-html.hbs";

/** 初級 */
const beginner = () => `<div class="${ROOT_CLASS}__beginner">初級</div>`;

/** 中級 */
const intermediate = () =>
  `<div class="${ROOT_CLASS}__intermediate">中級</div>`;

/** 上級 */
const advanced = () => `<div class="${ROOT_CLASS}__advanced">上級</div>`;

/**
 * エピソードタイプに応じたアイコンを生成する
 * @param type エピソードタイプ
 * @return アイコン
 */
const episodeType = (type: EpisodeType): string => {
  switch (type) {
    case "Beginner":
      return beginner();
    case "Intermediate":
      return intermediate();
    case "Advanced":
      return advanced();
    default:
      return beginner();
  }
};

/**
 * ルート要素のinnerHTML
 * @param ids data-idをあつめたもの
 * @param type エピソードタイプ
 * @param level ステージレベル
 * @param title ステージタイトル
 * @return innerHTML
 */
export function rootInnerHTML(
  ids: DataIDs,
  type: EpisodeType,
  level: number,
  title: string,
): string {
  return rootInnerHTMLTemplate({
    ids,
    ROOT_CLASS,
    episodeType: episodeType(type),
    type,
    level,
    title
  });
}
