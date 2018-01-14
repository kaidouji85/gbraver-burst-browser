// @flow

/**
 * Tiled用のデータ型
 * Tiledについては、以下URLを参照
 * http://www.mapeditor.org/
 *
 * 以下URLにJSONフォーマットが掲載されている
 * http://doc.mapeditor.org/en/latest/reference/json-map-format/
 *
 * しかし、実際のファイルはこれとは異なっている
 * 本ファイルの型定義は、実際のファイルに合わせたものである
 */

/**
 * タイルセットファイルのJSONフォーマット
 */
export type TileSetJson = {
  columns: number,
  image: string,
  imageheight: number,
  imagewidth: number,
  margin: number,
  name: string,
  properties: Object,
  propertytypes: Object,
  spacing: number,
  tilecount: number,
  tileheight: number,
  tilewidth: number,
};

/**
 * タイルマップファイルのJSONフォーマット
 */
export type TileMapJson = {
  backgroundcolor: string,
  height: number,
  layers: TiledLayer[],
  nextobjectid: number,
  orientation: string,
  properties: Object,
  renderorder: string,
  tileheight: number,
  tilesets: TileSetForTileMap[],
  tilewidth: number,
  version: number,
  tiledversion: string,
  width: number,
};

/** タイルマップに付属するタイルセット情報 */
export type TileSetForTileMap = {
  firstgid: number,
  source: string
};

/** レイヤーデータ */
export type TiledLayer = {
  data: number[],
  height: number,
  name: string,
  opacity: number,
  properties: Object,
  type: string,
  visible: boolean,
  width: number,
  x: number,
  y: number,
};