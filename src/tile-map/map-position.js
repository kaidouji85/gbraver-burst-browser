// @flow

import type {TiledLayer} from "./tiled";

/**
 * タイルマップのthree.js上での描画位置を計算して返す
 *
 * @param index TiledLayer.dataのインデックス
 * @param layer レイヤーデータ
 * @param meshWith 単位タイルマップメッシュの幅
 * @param meshHeight 単位タイルマップメッシュの高さ
 * @return 描画位置
 */
export function getMapPosition(index: number, layer: TiledLayer, meshWith: number, meshHeight: number): { x: number, y: number, z: number } {
  return {
    x: (index % layer.width) * meshWith,
    y: 0,
    z: Math.floor(index / layer.width) * meshHeight
  };
}