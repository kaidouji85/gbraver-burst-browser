// @flow
import type {TextureResource} from "./texture";
import {loadAllTexture} from "./texture";
import type {CanvasImageResource} from "./canvas-image";
import {loadAllCanvasImage} from "./canvas-image";
import type {GlTFResource} from "./gltf";
import {loadAllGlTFModel} from "./gltf";
import type {CubeTextureResource} from "./cube-texture";
import {loadAllCubeTexture} from "./cube-texture";
import type {SoundResource} from "./sound";
import {loadAllSounds} from "./sound";
import type {ResourcePath} from "./path/resource-path";
import {Observable} from "rxjs";
import {Loading} from "../game/dom-scenes/loading";
import type {LoadingAction} from "../action/loading/loading";

/**
 * ゲームで使うリソースを集めたもの
 */
export type Resources = {
  /** リソースパス */
  path: ResourcePath,
  /** GlTFモデル */
  gltfs: GlTFResource[],
  /** テクスチャ */
  textures: TextureResource[],
  /** キューブテクスチャ */
  cubeTextures: CubeTextureResource[],
  /** キャンバス用画像 */
  canvasImages: CanvasImageResource[],
  /** 音 */
  sounds: SoundResource[],
};

// TODO 削除する
/**
 * ゲームで使う全てのリソースを読み込む
 *
 * @param basePath ベースとなるパス
 * @return 読み込み結果
 */
export async function loadAllResource(resourcePath: ResourcePath): Promise<Resources> {
  const basePath = `${resourcePath.get()}/`;
  const [gltfs, textures, cubeTextures, canvasImages, sounds] = await Promise.all([
    loadAllGlTFModel(basePath),
    loadAllTexture(basePath),
    loadAllCubeTexture(basePath),
    loadAllCanvasImage(basePath),
    loadAllSounds(resourcePath),
  ]);

  return {
    path: resourcePath,
    gltfs: gltfs,
    textures: textures,
    cubeTextures: cubeTextures,
    canvasImages: canvasImages,
    sounds: sounds,
  };
}

// export class ResourceLoader {
//   constructor(resourcePath: ResourcePath) {
//
//   }
//
//   load(): Promise<Resources> {
//
//   }
//
//   progress(): Observable<LoadingAction> {
//
//   }
// }
