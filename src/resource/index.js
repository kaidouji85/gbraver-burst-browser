// @flow
import type {TileMapResource} from "./tile-map";
import {loadAllTileMap} from "./tile-map";
import type {TextureResource} from "./texture";
import {loadAllTexture} from "./texture";
import type {JsonModelResource} from "./json-model";
import {loadAllJsonModel} from "./json-model";
import type {CanvasImageResource} from "./canvas-image";
import {loadAllCanvasImage} from "./canvas-image";

/**
 * ゲームで使うリソースを集めたもの
 */
export type Resources = {
  /** モデル */
  models: JsonModelResource[],
  /** テクスチャ */
  textures: TextureResource[],
  /** キャンバス用画像 */
  canvasImages: CanvasImageResource[],
  /** タイルマップ */
  tileMap: TileMapResource[],
};

/**
 * ゲームで使う全てのリソースを読み込む
 *
 * @param basePath ベースとなるパス
 * @return 読み込み結果
 */
export async function loadAllResource(basePath: string): Promise<Resources> {
  const tileMap = loadAllTileMap();
  const [models, textures, canvasImages] = await Promise.all([
    loadAllJsonModel(basePath),
    loadAllTexture(basePath),
    loadAllCanvasImage(basePath),
  ]);

  return {
    models: models,
    textures: textures,
    tileMap: tileMap,
    canvasImages: canvasImages
  };
}