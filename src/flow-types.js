// @flow
import THREE_LIB from 'three-js';
const THREE = THREE_LIB();

/**
 * リソースマネージャ
 */
export type Resources = {
  /** モデル */
  models: Model[],

  /** テクスチャ */
  textures: Texture[]
};

/**
 * モデル管理オブジェクト
 */
export type Model = {
  /** モデルのパス */
  path: string,

  /** 形状 */
  geometry: THREE.Geometry,

  /** 材質 */
  material: THREE.Material
};

/**
 * テクスチャ管理オブジェクト
 */
export type Texture = {
  /** テクスチャのパス */
  path: string,

  /** テクスチャ */
  texture: THREE.Texture
};