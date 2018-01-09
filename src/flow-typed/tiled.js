// @flow

/**
 * Tiled用のデータ型
 * Tiledについては、以下URLを参照
 * http://www.mapeditor.org/
 */

/** タイルセット */
export type TileSet = {
  columns: number,
  firstgid: number,
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

/** タイルマップ */
export type TileMapData = {
  backgroundcolor: string,
  height: number,
  layers: TiledLayer[],
  nextobjectid: number,
  orientation: string,
  properties: Object,
  renderorder: string,
  tileheight: number,
  tilesets: any[],
  tilewidth: number,
  version: number,
  tiledversion: string,
  width: number,
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