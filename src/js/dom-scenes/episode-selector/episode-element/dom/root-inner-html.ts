import {EpisodeNumber, EpisodeType} from "../../../../game/episodes/episode";
import { ROOT_CLASS } from "./class-name";
import { DataIDs } from "./data-ids";
import rootInnerHTMLTemplate from "./root-inner-html.hbs";

/** エピソード */
const main = () => `<div class="${ROOT_CLASS}__main">メイン</div>`;

/** サイドエピソード */
const side = () => `<div class="${ROOT_CLASS}__side">サイド</div>`;

/**
 * エピソードタイプに応じたアイコンを生成する
 * @param type エピソードタイプ
 * @return アイコン
 */
const episodeType = (type: EpisodeType): string => {
  switch (type) {
    case "Episode":
      return main();
    case "Side Episode":
      return side();
    default:
      return main();
  }
};

/**
 * ルート要素のinnerHTML
 * @param ids data-idをあつめたもの
 * @param type エピソードタイプ
 * @param number エピソード番号
 * @param title タイトル
 * @return innerHTML
 */
export function rootInnerHTML(
  ids: DataIDs,
  type: EpisodeType,
  number: EpisodeNumber,
  title: string,
): string {
  return rootInnerHTMLTemplate({
    ids,
    ROOT_CLASS,
    episodeType: episodeType(type),
    type,
    number,
    title,
  });
}
