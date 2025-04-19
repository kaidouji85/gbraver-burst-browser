import { CanvasImageResource } from "./canvas-image/resource";
import { CubeTextureResource } from "./cube-texture/resource";
import { GlTFResource } from "./gltf/resource";
import { Path } from "./path/resource";
import { ResourceRoot } from "./resource-root";
import { SoundResource } from "./sound/resource";
import { TextureResource } from "./texture/resource";

/** ゲームで使うリソースを集めたもの */
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
 * リソース管理オブジェクトコンテナ
 * プロパティ、パラメータでResourcesを使う場合、
 * 同じプロパティ名にしてオブジェクトの引き回しが出来るようにする
 */
export type ResourcesContainer = {
  /** リソース管理オブジェクト */
  resources: Resources;
};
