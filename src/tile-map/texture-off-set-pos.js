// @flow

import type {TileMapJson, TileSetJson} from "../flow-typed/tiled";

/**
 *  タイルチップIDからテクスチャオフセット座標を計算する
 *
 * @param gid タイルチップID
 * @param tileSet タイルセットのデータ
 * @return テクスチャオフセット座標
 */
export function getTextureOffsetPos(gid: number, tileSet: TileSetJson, tileMap: TileMapJson): {x: number, y: number} {
  const tileIndex = gid - tileMap.tilesets[0].firstgid;
  const horizonDividedNum = getHorizonDividedNum(tileSet);
  const verticalDividedNum = getVerticalDividedNum(tileSet);
  return {
    x: (tileIndex % horizonDividedNum) / horizonDividedNum,
    y: (verticalDividedNum -1 -Math.floor(tileIndex / horizonDividedNum)) / verticalDividedNum
  };
}

/** タイルセットの横分割数を計算する */
export function getHorizonDividedNum(tileSet: TileSetJson): number {
  return Math.floor(tileSet.imagewidth / tileSet.tilewidth);
}

/** タイルセットの縦分割数を計算する */
export function getVerticalDividedNum(tileSet: TileSetJson): number {
  return Math.floor(tileSet.imageheight / tileSet.tileheight);
}