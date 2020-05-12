// @flow

import type {ResourcePath} from "../../resource/path/resource-path";

/**
 * プリロードする画像ファイル一覧
 *
 * @param resourcePath リソースパス
 * @return プリロードする画像ファイル一覧
 */
export function imageURLs(resourcePath: ResourcePath): string[] {
  return [
    //`${resourcePath.get()}/armdozer/shin-braver/player-select.png`,
    //`${resourcePath.get()}/armdozer/neo-landozer/player-select.png`,
    //`${resourcePath.get()}/armdozer/ligjtning-dozer/player-select.png`,
  ];
}