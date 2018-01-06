// @flow

/**
 * Tiled用のデータ型
 * Tiledについては、以下URLを参照
 * http://www.mapeditor.org/
 */

/** マップデータ */
export type MapData = {
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