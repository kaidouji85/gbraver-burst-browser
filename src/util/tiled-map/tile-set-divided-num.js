// @flow

import type {TileSet} from "../../flow-typed/tiled";

/** タイルセットの横分割数を計算する */
export function getHorizonDividedNum(tileSet: TileSet): number {
  return Math.floor(tileSet.imagewidth / tileSet.tilewidth);
}

/** タイルセットの縦分割数を計算する */
export function getVerticalDividedNum(tileSet: TileSet): number {
  return Math.floor(tileSet.imageheight / tileSet.tileheight);
}