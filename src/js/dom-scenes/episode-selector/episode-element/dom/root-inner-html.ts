import { EpisodeType } from "../../../../game/episodes/episode";
import { Resources } from "../../../../resource";
import { Episode } from "../episode";
import { ROOT_CLASS } from "./class-name";
import { DataIDs } from "./data-ids";
import rootInnerHTMLTemplate from "./root-inner-html.hbs";
import {PathIds} from "../../../../resource/path/ids";

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
 * @param resources リソース管理オブジェクト
 * @param episode エピソード情報
 * @return innerHTML
 */
export function rootInnerHTML(ids: DataIDs, resources: Resources, episode: Episode): string {
  const check = resources.paths.find(v => v.id === PathIds.CHECK)?.path ?? "";
  return rootInnerHTMLTemplate({
    ...episode,
    ids,
    ROOT_CLASS,
    type: episodeType(episode.type),
    check,
  });
}
