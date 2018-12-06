// @flow
import type {TileMapResource} from "./tile-map";
import {loadAllTileMap} from "./tile-map";
import type {TextureResource} from "./texture";
import {loadAllTexture} from "./texture";
import type {CanvasImageResource} from "./canvas-image";
import {loadAllCanvasImage} from "./canvas-image";
import type {GlTFResource} from "./gltf";
import {loadAllGlTFModel} from "./gltf";

/**
 * ゲームで使うリソースを集めたもの
 */
export type Resources = {
  /** GlTFモデル */
  gltfs: GlTFResource[],
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
  const [gltfs, textures, canvasImages] = await Promise.all([
    loadAllGlTFModel(basePath),
    loadAllTexture(basePath),
    loadAllCanvasImage(basePath),
  ]);

  return {
    gltfs: gltfs,
    textures: textures,
    tileMap: tileMap,
    canvasImages: canvasImages
  };
}