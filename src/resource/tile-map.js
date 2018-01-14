// @flow

import type {TileMapJson, TileSetJson} from "../flow-typed/tiled";
import SCHOOL_GROUND_TILE_MAP from '../../resources/tile-map/school-ground/tile-data.json';
import SCHOOL_GROUND_TILE_SET from '../../resources/tile-map/school-ground/map.json';

/** タイルマップID */
export type TileMapId = string;

/** タイルマップリソース */
export type TileMapResource = {
  /** タイルマップID */
  id: TileMapId,
  /** マップ */
  tileMap: TileMapJson,
  /** タイルセット */
  tileSet: TileSetJson,
};

/** タイルマップIDを集めたもの */
export const TILE_MAP_IDS = {
  SCHOOL_GROUND: 'SCHOOL_GROUND'
};

/**
 * タイルマップのデータを全て読み込む
 * webpackではjsonファイルのimportが可能なので、
 * jsonの読み込み処理は行わずimportしたjsonをそのまま返している
 *
 * @return 読み込み結果
 */
export function loadAllTileMap(): TileMapResource[] {
  return [{
    id: TILE_MAP_IDS.SCHOOL_GROUND,
    tileMap: SCHOOL_GROUND_TILE_MAP,
    tileSet: SCHOOL_GROUND_TILE_SET
  }];
}
