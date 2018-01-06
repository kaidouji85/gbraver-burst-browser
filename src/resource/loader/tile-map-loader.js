// @flow

import SCHOOL_GROUND_TILE_MAP from '../../../resources/tile-map/school-ground/tile-data.json';
import type {MapData} from "../../flow-typed/tiled";

/**
 * タイルマップのパス
 * resourcesフォルダからの相対パスで指定する
 */
export const TILE_MAP_PATH = {
  SCHOOL_GROUND: 'tile-map/school-ground/tile-data.json',
};

/** タイルマップ管理オブジェクト */
export type TileMap = {
  /** データパス */
  path: string,
  /** タイルマップ */
  map: MapData,
};

/**
 * タイルマップのデータを全て読み込む
 * webpackではjsonファイルのimportが可能なので、
 * jsonの読み込み処理は行わずimportしたjsonをそのまま返している
 *
 * @return 読み込み結果
 */
export function loadAllTileMap(): TileMap[] {
  return [{
    path: TILE_MAP_PATH.SCHOOL_GROUND,
    map: SCHOOL_GROUND_TILE_MAP
  }];
}