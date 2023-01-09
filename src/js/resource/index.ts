import type { CanvasImageResource } from "./canvas-image";
import type { CubeTextureResource } from "./cube-texture";
import type { GlTFResource } from "./gltf";
import type { Path } from "./path";
import type { ResourceRoot } from "./resource-root";
import type { SoundResource } from "./sound";
import type { TextureResource } from "./texture/resource";

/**
 * ゲームで使うリソースを集めたもの
 */
export type Resources = {
  /** リソースフォルダのルート */
  rootPath: ResourceRoot;

  /** 各種リソースのパス */
  paths: Path[];

  /** GlTFモデル */
  gltfs: GlTFResource[];

  /** テクスチャ */
  textures: TextureResource[];

  /** キューブテクスチャ */
  cubeTextures: CubeTextureResource[];

  /** キャンバス用画像 */
  canvasImages: CanvasImageResource[];

  /** 音 */
  sounds: SoundResource[];
};

/**
 * 空のリソース管理オブジェクトを生成する
 *
 * @param resourceRoot リソースルート
 * @return リソース管理オブジェクト
 */
export function emptyResources(resourceRoot: ResourceRoot): Resources {
  return {
    rootPath: resourceRoot,
    paths: [],
    gltfs: [],
    textures: [],
    cubeTextures: [],
    canvasImages: [],
    sounds: [],
  };
}
